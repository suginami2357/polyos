import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from "react";
import { ScoreType } from "../types";

const Score = ({score}: ScoreType) => {
  return(
    <div>
    <p>SCORE:{score}</p>
    </div>
  );
};

export default Score;