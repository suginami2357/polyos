import React from 'react';
import './Score.css';
import * as types from "../types";

const Score = ({value}: types.ScoreType) => {
  return(
    <div className='score-container'>
      <p className='score-title'>SCORE</p>
      <p className='score-value'>{value}</p>
    </div>
  );
};

export default Score;