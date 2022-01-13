import React from "react";
import './Hold.css';
import * as types from "../types";
import * as constants from "../constants";

const Hold = ({value}: types.HoldType) => {
  let origin = Math.ceil((constants.Fixed.width - constants.Active.width) / 2);
  let size = 10;
  if(value.length !== 0){
    let width = (window.innerWidth * 0.15) / constants.Active.width;
    let height = (window.innerHeight * 0.15) / constants.Active.height;
    size = Math.min(width, height);
  }

  return(
    <div className='hold-container'>
      <p>Hold</p>
      <table>
        <tbody>
          {value.map((line, r) => {
            if(r < constants.Active.height){
              return (
                <tr key={r}>
                  {line.map((cell, c) => {
                    if(origin <= c && c < origin + constants.Active.width){
                      return(<td key={c} className={cell} style={{width: size, height: size}}></td>);
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
};

export default Hold;