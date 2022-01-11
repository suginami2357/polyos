import React, { useEffect, useRef } from 'react';
import './Game.css';
import Score from "../components/Score";
import Next from "../components/Next";
import Board from '../components/Board';
import * as types from "../types";
import * as number from "../libs/number";

const Game = React.forwardRef(({accelerate, setAccelerate, step, setStep, score, setScore, board, setBoard, next, setNext}: types.GameType)=> {

  const ref = useRef<HTMLTableCellElement>(null)

  const BOARD = {
    type: {
      none: "none",
      activate: {
        height: 5,
        width: 5,
        center: "activate-center",
        around: "activate-around",
      },
      fixed: {
        height: 22,
        width: 11,
        center: "fixed-center",
        around: "fixed-around",
      }
    }
  } as const;

  useEffect(() => {
    (async() => {
      //処理結果
      let result = board;

      //接触判定
      if(!Collision(result)){

        //ブロック落下
        result = Fall(result);
      } else{

        //ゲームオーバー判定
        if(GameOver(result)){
          alert("SCORE: " + score);
          Initialize();
          return;
        }

        //ブロック固定
        result = Fix(result);

        //スコア計算
        let count = Count(result);
        setScore(x => x + count);

        //ブロック削除
        result = Delete(result);

        //次ブロック追加
        result = Add(result, next);

        //ブロック作成
        setNext(New(score));

        setAccelerate(false);
      }

      //盤面を更新
      setBoard(result);

      //ブロックの落下速度
      let time = accelerate ? 50 : Math.max(100, 800 - (score * 10));
      await new Promise(r => setTimeout(r, time));

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

    //左にスワイプ
    if(origin < -margin){
      setBoard(x => MoveLeft(x));
      setAccelerate(false);
      window.swipe.start = {x: window.swipe.curent.x, y: window.swipe.curent.y};
      return;
    } 

    //右にスワイプ
    if(origin > margin){
      setBoard(x => MoveRight(x));
      setAccelerate(false);
      window.swipe.start = {x: window.swipe.curent.x, y: window.swipe.curent.y};
      return;
    }

    //下にスワイプ
    if(window.swipe.curent.y > window.swipe.start.y + 3){
      setAccelerate(true);
      return;
    }
  }

  window.ontouchend = (e) => {
    e.preventDefault();

    setAccelerate(false);
    if(!window.swipe.activate){
      setBoard(x => Rotate(x));
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
      case 'ArrowUp'    : setBoard(x => Rotate(x));     break;
      case 'ArrowDown'  : setAccelerate(true);          break;
      case 'ArrowLeft'  : setBoard(x => MoveLeft(x));   break;
      case 'ArrowRight' : setBoard(x => MoveRight(x));  break;
    }
  }

  window.onkeyup = (e) => {
    window.KeyDown[e.key] = false;
    setAccelerate(false);
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

    let value = Add([...Array(BOARD.type.fixed.height)].map(() => Array(BOARD.type.fixed.width).fill(BOARD.type.none)), New(0));
    setBoard(value);
    setNext(New(10));
    setStep(0);
  }

  const MoveLeft = (board: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let r = 0; r < board.length; r++){
      for(let c = 0; c < board[r].length; c++){
        if(board[r][c] !== BOARD.type.activate.center && board[r][c] !== BOARD.type.activate.around){
          continue;
        }

        if(c === 0){
          return board;
        }
        if(board[r][c - 1] === BOARD.type.fixed.center || board[r][c - 1] === BOARD.type.fixed.around){
          return board;
        }
        result[r][c - 1] = board[r][c];
        result[r][c] = BOARD.type.none;
      }
    }
    return result;
  }

  const MoveRight = (board: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let r = 0; r < board.length; r++){
      for(let c = board[r].length - 1; c >= 0; c--){
        if(board[r][c] !== BOARD.type.activate.center && board[r][c] !== BOARD.type.activate.around){
          continue;
        }

        if(c === (BOARD.type.fixed.width - 1)){
          return board;
        }
        if(board[r][c + 1] === BOARD.type.fixed.center || board[r][c + 1] === BOARD.type.fixed.around){
          return board;
        }
        result[r][c + 1] = board[r][c];
        result[r][c] = BOARD.type.none;
     }
    }
    return result;
  }

  const Rotate = (board: string[][]): string[][] => {
    let center = {row: 0, column: 0};
    board.map((x)=> Array.from(x)).forEach((line, r) => line.forEach((cell, c) => { if(cell === BOARD.type.activate.center){ center = {row: r, column: c}; }}));
    let result = board.map((x)=> Array.from(x));
    let brock = [];
    for(let r = 0; r < board.length; r++){
      for(let c = 0; c < board[r].length; c++){
        if(board[r][c] !== BOARD.type.activate.around){
          continue;
        }
        let row = center.row + (c - center.column);
        let column = center.column - (r - center.row);

        if(row < 0 || board.length <= row){
          return board;
        }
        if(column < 0 || board[r].length <= column){
          return board;
        }
        if(board[row][column] === BOARD.type.fixed.center || board[row][column] === BOARD.type.fixed.around){
          return board;
        }
        result[r][c] = BOARD.type.none;
        brock.push({row: row, column: column});
      }
    }
    brock.forEach(x => result[x.row][x.column] = BOARD.type.activate.around);
    return result;
  }

  const Collision = (board: string[][]): boolean => {
    for(let r = 0; r < board.length; r++){
      for(let c = 0; c < board[r].length; c++){
        if(board[r][c] !== BOARD.type.activate.center && board[r][c] !== BOARD.type.activate.around){
          continue;
        }

        //落下ブロックが一番下に存在
        if(r === (BOARD.type.fixed.height - 1)){
          return true;
        }

        //落下ブロックの下に固定ブロックが存在
        if(board[r + 1][c] === BOARD.type.fixed.center || board[r + 1][c] === BOARD.type.fixed.around){
          return true;
        }
      }
    }
    return false;
  }

  const GameOver = (board: string[][]) :boolean => {
    let column = 2 + Math.ceil((BOARD.type.fixed.width - BOARD.type.activate.width) / 2);
    let result = (board[2][column] === BOARD.type.activate.center);
    return result;
  }

  const Fall = (board: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let r = board.length - 1; r >= 0; r--){
      for(let c = 0; c < board[r].length; c++){
        if(board[r][c] === BOARD.type.activate.center || board[r][c] === BOARD.type.activate.around){
          result[r + 1][c] = board[r][c];
          result[r][c] = BOARD.type.none;
        }
      }
    }
    return result;
  }
  
  const Fix = (board: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let r = 0; r < board.length; r++){
      for(let c = 0; c < board[r].length; c++){
        if(board[r][c] === BOARD.type.activate.center){
          result[r][c] = BOARD.type.fixed.center;
        }
        if(board[r][c] === BOARD.type.activate.around){
          result[r][c] = BOARD.type.fixed.around;
        }
      }
    }
    return result;
  }

  const Count = (board: string[][]): number => {
    let result = 0;
    for(let row = 0; row < board.length; row++){
      if(board[row].every(cell => cell !== BOARD.type.none)){
        result++;
      }
    }
    return result;
  }

  const Delete = (board: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let row = board.length - 1; row >= 0; row--){
      if(board[row].every(cell => cell !== BOARD.type.none)){
        result.splice(row, 1);
        result.unshift(Array(board[row].length).fill(BOARD.type.none));
      }
    }
    return result;
  }

  const Add = (board: string[][], brock: string[][]): string[][] => {
    let result = board.map((x)=> Array.from(x));
    for(let r = 0; r < brock.length; r++){
      for(let c = 0; c < brock[r].length; c++){
        let cell = brock[r][c];
        if(cell === BOARD.type.none){
          continue;
        }

        let index = c + Math.ceil((BOARD.type.fixed.width - BOARD.type.activate.width) / 2);
        if(r === 2 && c === 2){
          result[r][index] = BOARD.type.activate.center;
        } else {
          result[r][index] = BOARD.type.activate.around;
        }
      }
    }
    return result;
  }

  const New = (score: number): string[][] => {
    let cell = {row: 2, column: 2};

    //枠を生成
    let brock = [...Array(BOARD.type.activate.height)].map(() => Array(BOARD.type.activate.width).fill(BOARD.type.none));
    brock[cell.row][cell.column] = BOARD.type.activate.center;

    //ブロックサイズを設定
    let max = 4 + (score / 10);
    let length = number.Random(4, max);

    for(let i = 1; i < length; i++){
      //移動先を設定（上下左右）
      let choices: {row: number, column: number}[] = [];
      if(0 < cell.row){choices.push({row: cell.row - 1, column: cell.column})};
      if(0 < cell.column){choices.push({row: cell.row, column: cell.column - 1})}
      if(cell.row < 4){choices.push({row: cell.row + 1, column: cell.column})}
      if(cell.column < 4){choices.push({row: cell.row, column: cell.column + 1})}
      
      //既に移動したセルを除外
      choices = choices.filter(x => brock[x.row][x.column] === BOARD.type.none);

      //移動先が無ければ終了
      if (choices.length == 0){
        return brock;
      }

      //移動先を決定
      let index = number.Random(0, choices.length);

      //真ん中に戻す
      if(index == choices.length){
        cell = {row : 2, column: 2};
        i--;
      } 
      //移動先の色を塗る
      else {
      cell = choices[index];
      brock[cell.row][cell.column] = BOARD.type.activate.around;
      }
    }
    return brock;
  }
  
  return(
    <div className="wrapper">
      <div className="header-wrapper">
        <div className='score'>
          <Score score={score}/>
        </div>
        <div>
          <Next next={next}/>
        </div>
      </div>
      <div className="body-wrapper">
        <Board board={board} ref={ref}/>
      </div>
    </div>
  );
});

export default Game;