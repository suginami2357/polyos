import React, { forwardRef } from 'react';
import * as types from "../types";

const Board = forwardRef(({board}: types.BoardType, ref : React.Ref<HTMLTableCellElement>) => {
  return(
    <div>
      <table className="board-table">
        <tbody>
          {board.map((row, r) => {
            if(r > 1){
              return (
                <tr key={r}>
                  {row.map((cell, c) => {
                    if(cell === "brock-activate-center"){
                      return(<td key={c} className={board[r][c]} ref={ref}></td>);
                    } else{
                      return(<td key={c} className={board[r][c]}></td>);
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