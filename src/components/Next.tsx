import React from 'react';
import ReactDOM from 'react-dom';
import { NextType } from "../types";

const Next = ({next}: NextType) => {
  return(
    <div>
      <table className="board-table">
        <tbody>
          {next.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return(
                    <td key={index} className={cell.className}></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Next;