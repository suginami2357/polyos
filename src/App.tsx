import { useState, useEffect } from "react";
import Game from "./pages/Game";
import { New } from "./libs/cell";
import { IsCollision, CountDelete, Marge } from "./libs/board";
import { Generate, Fall, Rotate, HardDrop, Left, Right, } from "./libs/brock";
import { Delelte } from "./libs/board";
import { CellDataType } from "./types";

function App() {
  const[time, setTime] = useState<number>(500);
  const[length, setLength] = useState<number>(4);
  const[score, setScore] = useState<number>(40);

  const[board, setBoard] = useState<CellDataType[][]>(New(20, 10));
  const[brock, setCurrent] = useState<CellDataType[][]>([]);
  const[next, setNext] = useState<CellDataType[][]>(Generate(length));

  //スコアからゲームスピード・ブロックサイズを設定
  useEffect(() => {
    setTime(500 - (score * 8));
    setLength(3 + score / 20);
  }, [score]);

  //ゲーム処理
  function step(){

    //接地判定
    if(!IsCollision(board, brock)){
      //自由落下
      setCurrent(Fall(brock));
      return;
    }

    //ブロックをボードに加える
    setBoard(Marge(board, brock));

    //消去するライン数をスコアに加算
    setScore(CountDelete(board));

    //ブロック消去
    setBoard(Delelte(board));

    //新しいブロックを生成
    setNext(Generate(score));

    window.setTimeout(step, time);
  }

  //キーボード操作
  window.onkeydown = (e) => {
    switch (e.key) {
      case 'Space':
        Rotate(brock);
        break;

      case 'ArrowUp':
       HardDrop(brock, board);
        setBoard(Marge(board, brock));
        break;

      case 'ArrowLeft':
        Left(brock);
        break;

        case 'ArrowDown':
        
        break;

      case 'ArrowRight':
        Right(brock);
        break;
    }
  }

  window.onkeyup = (e) => {
    switch(e.key){
      case 'ArrowDown':
        break;
    }
  }

  return (
    <div className="App">
      <Game board={board} current={brock} next={next} score={score} />
    </div>
  );
}

export default App;
