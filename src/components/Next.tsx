import React from "react";
import './Next.css';
import * as types from "../types";

const Next = ({next}: types.NextType) => {
  let size = 15;
  if(next.length !== 0){
    let width = ((window.innerWidth * 0.2) - (next[0].length * 4)) / next[0].length;
    let height = ((window.innerHeight * 0.2) - (next.length * 4)) / next.length;
    size = width < height ? width : height;
  }

  return(
    <div className='next-container'>
      <table>
        <tbody>
          {next.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return(<td key={index} className={cell} style={{width: size, height: size}}></td>);
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