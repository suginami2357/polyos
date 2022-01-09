import React from "react";
import * as types from "../types";

const Next = ({next}: types.NextType) => {
  return(
    <div>
      <table className="board-table">
        <tbody>
          {next.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return(<td key={index} className={cell}></td>);
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