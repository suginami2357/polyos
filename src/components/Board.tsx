import React, { forwardRef } from 'react';
import './Board.css';
import * as types from "../types";
import * as constants from "../constants";

const Board = forwardRef(({active, fixed}: types.BoardType, ref : React.Ref<HTMLTableCellElement>) => {

  //ブロックをマージ
  let result = fixed.map((x)=> Array.from(x));
  for(let r = 0; r < active.length; r++){
    for(let c = 0; c < active[r].length; c++){
      if(active[r][c] !== constants.State.none){
        result[r][c] = active[r][c];
      }
    }
  }

  let size = 25;
  if(result.length !== 0){
    let width = (window.innerWidth * 0.72) / result[0].length;
    let height = (window.innerHeight * 0.72) / result.length;
    size = Math.min(width, height);
  }

  return(
    <div className='board-container'>
      <table>
        <tbody>
          {result.map((line, r) => {
            if(r > 1){
              return (
                <tr key={r}>
                  {line.map((cell, c) => {
                    if(cell === "activate-center"){
                      return(<td key={c} className={result[r][c]} style={{ width: size, height: size }} ref={ref}></td>);
                    } else{
                      return(<td key={c} className={result[r][c]} style={{ width: size, height: size }}></td>);
                    }
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Board;