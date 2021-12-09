import { BoardType } from "../types";
import { AnyCells } from "../libs/cell";

const Board = ({board, brock} : BoardType) => {  
  let brockCells = AnyCells(brock);
  return(
    <table className="board-table">
      <tbody>
        {board.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((boardCell, index) => {
                let brockCell = brockCells.find(x => x.Row == boardCell.Row && x.Column == boardCell.Column);
                if(brockCell === undefined){
                  return (<td key={index} className={boardCell.ClassName}></td>)
                } else{
                  return (<td key={index} className={brockCell.ClassName}></td>);
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Board;