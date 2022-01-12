import React, { forwardRef } from 'react';
import './Board.css';
import * as types from "../types";

const Board = forwardRef(({value}: types.BoardType, ref : React.Ref<HTMLTableCellElement>) => {
  let size = 25;
  if(value.length !== 0){
    let width = (window.innerWidth * 0.75) / value[0].length;
    let height = (window.innerHeight * 0.75) / value.length;
    size = Math.min(width, height);
  }

  return(
    <div className='board-container'>
      <table>
        <tbody>
          {value.map((row, r) => {
            if(r > 1){
              return (
                <tr key={r}>
                  {row.map((cell, c) => {
                    if(cell === "activate-center"){
                      return(<td key={c} className={value[r][c]} style={{ width: size, height: size }} ref={ref}></td>);
                    } else{
                      return(<td key={c} className={value[r][c]} style={{ width: size, height: size }}></td>);
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