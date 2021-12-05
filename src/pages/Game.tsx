import Board from "../components/Board";
import Next from "../components/Next";
import Score from "../components/Score";
import './Game.css';
import { GameType } from "../types";

const Game = ({board, current, next, score}: GameType) => {
  return(
    <div className="wrapper-container">
    <span className="tetris-container">
    <Board board={board} brock={current}/>
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