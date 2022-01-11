import React, { forwardRef } from 'react';
import './Board.css';
import * as types from "../types";

const Board = forwardRef(({board}: types.BoardType, ref : React.Ref<HTMLTableCellElement>) => {
  let size = window.innerHeight / board.length < 30 ? window.innerHeight / board.length : 30;
  if(board.length !== 0){
    let width = (window.innerWidth * 0.8) / board[0].length;
    let height = (window.innerHeight * 0.8) / board.length;
    size = width < height ? width : height;
  }

  return(
    <div className='board-container'>
      <table>
        <tbody>
          {board.map((row, r) => {
            if(r > 1){
              return (
                <tr key={r}>
                  {row.map((cell, c) => {
                    if(cell === "activate-center"){
                      return(<td key={c} className={board[r][c]} style={{ width: size, height: size }} ref={ref}></td>);
                    } else{
                      return(<td key={c} className={board[r][c]} style={{ width: size, height: size }}></td>);
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