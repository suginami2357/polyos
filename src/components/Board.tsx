import { BoardType } from "../types";

const Board = ({board, brock} : BoardType) => {
  //画面にブロックを反映する
  // brock.map((row) => {
  //   row.map((cell) => {
  //     board[cell.Row][cell.Column].Class = cell.Class;
  //   })
  // })
  return(
    <table className="board-table">
      <tbody>
        {board.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, index) => {
                return (
                  <td key={index} className={cell.Class}></td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Board;