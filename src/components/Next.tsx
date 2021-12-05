import { NextType } from "../types";

const Next = ({brock}: NextType) => {
  return(
    <div>
      <table className="board-table">
        <tbody>
          {brock.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((cell, index) => {
                  return(
                    <td key={index} className={cell.Class}></td>
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