import Game from "./pages/Game";
import { useState, useEffect } from "react";
import { New } from "./libs/cell";
import { Generate, Fall, Rotate, HardDrop, Left, Right, } from "./libs/brock";
import { CellDataType } from "./types";

function App() {
  const[step, setStep] = useState<number>(0);
  const[time, setTime] = useState<number>(300);
  const[length, setLength] = useState<number>(4);
  const[score, setScore] = useState<number>(0);

  const[board, setBoard] = useState<CellDataType[][]>(New(20, 10));
  const[brock, setBrock] = useState<CellDataType[][]>(Generate(length));
  const[next, setNext] = useState<CellDataType[][]>(Generate(length));

  //スコアからゲームスピード・ブロックサイズを設定
  useEffect(() => {
    setTime(300 - (score * 8));
    setLength(4 + (score / 20));
  }, [score]);

  //ゲーム処理
  useEffect(() => {
    (async() => {
      await new Promise(r => setTimeout(r, time));
      setStep(step + 1);
    })();
  }, [step])


//--EventHandler
  window.onload = () => { window.isKeyDown = {} }

  window.onkeydown = (e) => {
    if(window.isKeyDown[e.key]){
      return;
    }
    window.isKeyDown[e.key] = true;

    switch (e.key) {
      case '':
        // HardDrop(brock, board);
        break;

      case 'ArrowUp':
        setBrock(Rotate(board, brock));
        break;

      case 'ArrowLeft':
        setBrock(Left(board, brock));
        break;

      case 'ArrowRight':
        setBrock(Right(board, brock));
        break;

      case 'ArrowDown':
        setTime(time / 4);
        break;
    }
  }

  window.onkeyup = (e) => {
    window.isKeyDown[e.key] = false;
    switch(e.key){
      case 'ArrowDown':
        setTime(time * 4);
        break;
    }
  }

  return (
    <div className="App">
      <Game step={step} setBoard={setBoard} board={board} setBrock={setBrock} brock={brock} setNext={setNext} next={next} score={score} length={length} />
    </div>
  );
}

export default App;
