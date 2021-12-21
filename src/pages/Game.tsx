import React from 'react';
import { useEffect, forwardRef } from "react";
import Board from "../components/Board";
import Next from "../components/Next";
import Score from "../components/Score";
import './Game.css';
import { GameType } from "../types";
import * as _brock from "../libs/brock";

const Game = React.forwardRef(({step, setFixed, fixed, setFalling, falling, setNext, next, setScore, score}: GameType, ref : React.Ref<HTMLTableCellElement>) => {

  useEffect(() => {
    let result = _brock.Fall(score, fixed, falling, next);
      setScore(result.score);
      setFixed(result.fixed);
      setFalling(result.falling);
      setNext(result.next);
  }, [step])

  return(
    <div className="wrapper-container">
    <span className="tetris-container">
      <Board fixed={fixed} falling={falling} ref={ref}/>
      <span className="tetris-panel-container">
        <p>Next</p>
        <Next next={next}/>
        <Score score={score} />
        <div className="tetris-panel-container-padding"></div>
      </span>
    </span>
  </div>
  );
});

export default Game;