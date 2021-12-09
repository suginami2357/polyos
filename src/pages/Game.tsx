import { useState, useEffect } from "react";
import Board from "../components/Board";
import Next from "../components/Next";
import Score from "../components/Score";
import './Game.css';
import { GameType } from "../types";
import { Generate, Fall } from "../libs/brock";
import { Collision, CountDelete, Marge } from "../libs/board";

const Game = ({step, setBoard, board, setBrock, brock, setNext, next, score, length}: GameType) => {

  //ゲーム処理
  useEffect(() => {
    //接触判定
    if(!Collision(board, Fall(brock))){
      setBrock(Fall(brock))
      return;
    }

    //落下中のブロックをボードに加える
    setBoard(Marge(board, brock));

    //消去するライン数をスコアに加算
    // setScore(CountDelete(board));

    //ブロック消去
    // setBoard(Delelte(board));

    //次のブロックを落下ブロックにする
    setBrock(next);

    //次のブロックを生成
    setNext(Generate(length));
  }, [step])

  return(
    <div className="wrapper-container">
    <span className="tetris-container">
      <Board board={board} setBrock={setBrock} brock={brock} />
      <span className="tetris-panel-container">
        <p>Next</p>
        <Next brock={next}/>
        <Score score={score}/>
        <div className="tetris-panel-container-padding"></div>
      </span>
    </span>
  </div>
  );
};

export default Game;