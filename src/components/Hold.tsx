import React from "react";
import './Hold.css';
import * as types from "../types";

const Hold = ({value}: types.NextType) => {
  let size = 10;
  if(value.length !== 0){
    let width = (window.innerWidth * 0.15) / value[0].length;
    let height = (window.innerHeight * 0.15) / value.length;
    size = Math.min(width, height);
  }

  return(
    <div className='hold-container'>
      <p>Hold</p>
      <table>
        <tbody>
          {value.map((row, index) => {
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

export default Hold;