import React, { useEffect, useRef } from 'react';
import './Game.css';
import Score from "../components/Score";
import Next from "../components/Next";
import Board from '../components/Board';
import * as types from "../types";
import * as constants from "../constants";
import * as number from "../libs/number";
import Hold from '../components/Hold';

const Game = React.forwardRef(({timeoutId, setTimeoutId, step, setStep, score, setScore, active, setActive, fixed, setFixed, next, setNext, hold, setHold, isHold, setIsHold}: types.GameType)=> {
  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    (async() => {
      //接触判定
      if(!Collision(active, fixed)){
        //ブロック落下
        setActive(x => Fall(x));
      } else{
        //ゲームオーバー判定
        if(active.length > 0 && GameOver(active)){
          Initialize();
          alert("SCORE: " + score);
          return;
        }

        //ブロック固定
        let result = Marge(active, fixed);

        //スコア計算
        let count = Count(result);
        setScore(x => x + count);

        //ブロック削除
        result = Delete(result);

        //盤面を更新
        setFixed(result);
        setActive(next);

        //ブロック作成
        setNext(New(score));

        //ホールド許可
        setIsHold(false);

        // //加速を中止
        // setAccelerate(false);
      }

      //落下の間隔
      await new Promise(r => {setTimeoutId(window.setTimeout(r, Math.max(100, 800 - (score * 10))))});

      setStep(step + 1);
    })();
  }, [step])

  useEffect(() => {
    Initialize();
  }, [])

//---タッチスクリーン---
  window.ontouchstart = (e) => {
    e.preventDefault();
    window.swipe.start.x = e.touches[0].pageX;
    window.swipe.start.y = e.touches[0].pageY;
  }

   window.ontouchmove = (e) => {
    e.preventDefault();
    window.swipe.activate = true;
    window.swipe.curent.x = e.touches[0].pageX;
    window.swipe.curent.y = e.touches[0].pageY;
    
    if(ref.current === null){
      return;
    }
    let origin = window.swipe.curent.x - window.swipe.start.x;
    let margin = ref.current.offsetWidth * 0.75;

    //上にスワイプ
    if(window.swipe.curent.y < window.swipe.start.y - 50){
      Exchange();
      return;
    }

    //下にスワイプ
    if(window.swipe.curent.y > window.swipe.start.y + 50){
      setActive(x => HardDrop(x, fixed));
      return;
    }

    //左にスワイプ
    if(origin < -margin){
      setActive(x => MoveLeft(x, fixed));
      // setAccelerate(false);
      window.swipe.start = {x: window.swipe.curent.x, y: window.swipe.curent.y};
      return;
    } 

    //右にスワイプ
    if(origin > margin){
      setActive(x => MoveRight(x, fixed));
      // setAccelerate(false);
      window.swipe.start = {x: window.swipe.curent.x, y: window.swipe.curent.y};
      return;
    }
  }

  window.ontouchend = (e) => {
    e.preventDefault();

    // setAccelerate(false);
    if(!window.swipe.activate){
      setActive(x => Rotate(x, fixed));
    }
    window.swipe.activate = false;
  }
//--------------------

//---キーボード操作---
  window.onkeydown = (e) => {
    if(window.KeyDown[e.key]){ 
      return; 
    } 
    window.KeyDown[e.key] = true;
    
    switch (e.key) {
      case 'Enter'      : Exchange();                           break;
      case 'ArrowUp'    : setActive(x => Rotate(x, fixed));     break;
      case 'ArrowDown'  : setActive(x => HardDrop(x, fixed));   break;
      case 'ArrowLeft'  : setActive(x => MoveLeft(x, fixed));   break;
      case 'ArrowRight' : setActive(x => MoveRight(x, fixed));  break;
    }
  }

  window.onkeyup = (e) => {
    window.KeyDown[e.key] = false;
    // setAccelerate(false);
  }
//--------------------

  const Initialize = () => {
    window.KeyDown = {};
        window.swipe = {
          activate: false, 
          start: {
            x: 0,
            y: 0,
          },
          curent: {
           x: 0,
           y: 0,
          }
        }

    setTimeoutId(0);
    // setAccelerate(false);
    setStep(0);
    setScore(0);
    setActive(New(0));
    setFixed([...Array(constants.Fixed.height)].map(() => Array(constants.Fixed.width).fill(constants.State.none)));
    setNext(New(0));
    setHold([...Array(constants.Fixed.height)].map(() => Array(constants.Fixed.width).fill(constants.State.none)))
    setIsHold(false);
  }

  const Rotate = (active: string[][], fixed: string[][]): string[][] => {
    let center = {row: 0, column: 0};
    active.map(x => Array.from(x)).forEach((line, r) => line.forEach((cell, c) => { if(cell === constants.State.center){ center = {row: r, column: c}; }}));
    let result = active.map((x)=> Array.from(x));
    let temp = [];
    for(let r = 0; r < active.length; r++){
      for(let c = 0; c < active[r].length; c++){
        if(active[r][c] !== "around"){
          continue;
        }
        let row = center.row + (c - center.column);
        let column = center.column - (r - center.row);

        //回転すると縦にはみ出す場合
        if(row < 0 || active.length <= row){
          return active;
        }
        //回転すると横にはみ出す場合
        if(column < 0 || active[r].length <= column){
          return active;
        }
        //回転すると他のブロックに接触する場合
        if(fixed[row][column] !== constants.State.none){
          return active;
        }
        result[r][c] = constants.State.none;
        temp.push({row: row, column: column});
      }
    }
    temp.forEach(x => result[x.row][x.column] = constants.State.around);
    return result;
  }

  const HardDrop = (active: string[][], fiexed: string[][]): string[][] => {
    let result = active.map(x => Array.from(x));
    while(!Collision(result, fiexed)){
      result = Fall(result);
    }
    return result;
  }

  const MoveLeft = (active: string[][], fiexed: string[][]): string[][] => {
    let result = active.map(x => Array.from(x));
    for(let r = 0; r < active.length; r++){
      for(let c = 0; c < active[r].length; c++){
        if(active[r][c] === constants.State.none){
          continue;
        }

        if(c === 0 || fiexed[r][c - 1] !== constants.State.none){
          return active;
        }
        result[r][c - 1] = active[r][c];
        result[r][c] = constants.State.none;
      }
    }
    return result;
  }

  const MoveRight = (active: string[][], fixed: string[][]): string[][] => {
    let result = active.map(x => Array.from(x));
    for(let r = 0; r < active.length; r++){
      for(let c = active[r].length - 1; c >= 0; c--){
        if(active[r][c] === constants.State.none){
          continue;
        }

        if(c === (constants.Fixed.width - 1) || fixed[r][c + 1] !== constants.State.none){
          return active;
        }
        result[r][c + 1] = active[r][c];
        result[r][c] = constants.State.none;
     }
    }
    return result;
  }

  const Exchange = (): void => {
    if(isHold){
      return;
    }
    setIsHold(true);

    let origin = {row: 2, column: 2 + Math.ceil((constants.Fixed.width - constants.Active.width) / 2)};
    let center = {row: 0, column: 0};
    let value = active.map((x)=> Array.from(x));
    value.map(x => Array.from(x)).forEach((line, r) => line.forEach((cell, c) => { if(cell === constants.State.center){ center = {row: r, column: c}; }}));
    let result = [...Array(constants.Fixed.height)].map(() => Array(constants.Fixed.width).fill(constants.State.none));
    for(let r = 0; r < value.length; r++){
      for(let c = 0; c < value[r].length; c++){
        if(value[r][c] === constants.State.none){
          continue;
        }
        let row = r + (origin.row - center.row);
        let column = c + (origin.column - center.column);
        result[row][column] = value[r][c];
      }
    }

    if(hold.flat().some(x => x !== constants.State.none)){
      setHold(result);
      setActive(hold);
    } else {
      setHold(result);
      setActive(next);
      setNext(New(score));
    }
  }

  const Collision = (active: string[][], fixed: string[][]): boolean => {
    for(let r = 0; r < active.length; r++){
      for(let c = 0; c < active[r].length; c++){
        if(active[r][c] === constants.State.none){
          continue;
        }

        //落下ブロックが一番下に存在
        if(r === constants.Fixed.height - 1){
          return true;
        }

        //ブロック同士が接触する
        if(fixed[r + 1][c] !== constants.State.none){
          return true;
        }
      }
    }
    return false;
  }

  const GameOver = (active: string[][]) :boolean => {
    let column = 2 + Math.ceil((constants.Fixed.width - constants.Active.width) / 2);
    let result = (active[2][column] === constants.State.center);
    return result;
  }

  const Fall = (value: string[][]): string[][] => {
    let result = value.map(x => Array.from(x));
    for(let r = value.length - 1; r >= 0; r--){
      for(let c = 0; c < value[r].length; c++){
        if(value[r][c] !== constants.State.none){
          result[r + 1][c] = value[r][c];
          result[r][c] = constants.State.none;
        }
      }
    }
    return result;
  }
  
  const Marge = (active: string[][], fixed: string[][]): string[][] => {
    let result = fixed.map(x => Array.from(x));
    for(let r = 0; r < active.length; r++){
      for(let c = 0; c < active[r].length; c++){
        if(active[r][c] !== constants.State.none){
          result[r][c] = active[r][c];
        }
      }
    }
    return result;
  }

  const Count = (value: string[][]): number => {
    let result = 0;
    for(let row = 0; row < value.length; row++){
      if(value[row].every(cell => cell !== constants.State.none)){
        result++;
      }
    }
    return result;
  }

  const Delete = (value: string[][]): string[][] => {
    let result = value.map(x => Array.from(x));
    for(let row = value.length - 1; row >= 0; row--){
      if(value[row].every(cell => cell !== constants.State.none)){
        result.splice(row, 1);
        result.unshift(Array(value[row].length).fill(constants.State.none));
      }
    }
    return result;
  }

  const New = (score: number): string[][] => {
    let origin = {row: 2, column: 2 + Math.ceil((constants.Fixed.width - constants.Active.width) / 2)};
    let cell = {row: origin.row, column: origin.column};

    let result = [...Array(constants.Fixed.height)].map(() => Array(constants.Fixed.width).fill(constants.State.none));
    result[cell.row][cell.column] = constants.State.center;

    //ブロックサイズを設定
    let max = 5 + (score / 20);
    let length = number.Random(4, max);

    for(let i = 0; i < length - 1; i++){
      //移動先を設定（上下左右）
      let choices: {row: number, column: number}[] = [];
      if(origin.row - 2 < cell.row){choices.push({row: cell.row - 1, column: cell.column})};
      if(origin.column - 2 < cell.column){choices.push({row: cell.row, column: cell.column - 1})}
      if(cell.row < origin.row + 2){choices.push({row: cell.row + 1, column: cell.column})}
      if(cell.column < origin.column + 2){choices.push({row: cell.row, column: cell.column + 1})}
      
      //既に移動したセルを除外
      choices = choices.filter(x => result[x.row][x.column] === constants.State.none);

      //移動先が無ければ終了
      if (choices.length === 0){
        return result;
      }

      //移動先を決定
      let index = number.Random(0, choices.length);

      //真ん中に戻す
      if(index === choices.length){
        cell = {row : origin.row, column: origin.column};
        i--;
      } 
      //移動先の色を塗る
      else {
      cell = choices[index];
      result[cell.row][cell.column] = constants.State.around;
      }
    }
    return result;
  }
  
  return(
    <div className="wrapper">
      <div className="header-wrapper">
        <Hold value={hold}/>
        <Score value={score}/>
        <Next value={next}/>
      </div>
      <div className="body-wrapper">
        <Board active={active} fixed={fixed} ref={ref}/>
      </div>
    </div>
  );
});

export default Game;