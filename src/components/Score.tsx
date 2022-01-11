import React from 'react';
import './Score.css';
import * as types from "../types";

const Score = ({score}: types.ScoreType) => {
  return(
    <div className='score-container'>
      <p>SCORE: {score}</p>
    </div>
  );
};

export default Score;