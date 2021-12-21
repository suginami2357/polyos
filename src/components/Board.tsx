import React from 'react';
import { forwardRef } from "react";
import * as _types from "../types";
import * as _cell from "../libs/cell";
import * as _brock from "../libs/brock";

const Board = forwardRef(({fixed, falling} : _types.BoardType, ref : React.Ref<HTMLTableCellElement>) => {
  return(
    <div>
      <table className="board-table">
        <tbody>
          {fixed.map((row, r) => {
            if(r > 2){
              return (
                <tr key={r}>
                  {row.map((_, c) => {
                    let cell = _cell.AnyCells(falling).find(x => x.row === r && x.column === c);
                    if(cell === undefined){
                      return (<td key={c} className={fixed[r][c].className}></td>);
                    } else if(cell.Core()){
                      return (<td ref={ref} key={c} className={cell.className}></td>)
                    } else{
                      return (<td key={c} className={cell.className}></td>)
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