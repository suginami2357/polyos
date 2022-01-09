import React from 'react';
import * as types from "../types";

const Score = ({score}: types.ScoreType) => {
  return(
    <div>
      <p>SCORE: {score}</p>
    </div>
  );
};

export default Score;