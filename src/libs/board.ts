import { CellDataType } from "../types"
import { AnyCells } from "./cell";

//接触判定
export const Collision = (board: CellDataType[][], brock: CellDataType[][]): boolean => {
  let boardCells = AnyCells(board);
  let brockCells = AnyCells(brock);

  return brockCells.some(x => {
    if(x.Row >= 20){
      return true;
    }

    if(boardCells.some(y => x.Row == y.Row && x.Column == y.Column)){
      return true;
    }
  })
}

//ブロックをボートに加える
export const Marge = (board: CellDataType[][], brock: CellDataType[][]):CellDataType[][] => {
  let boardCells = AnyCells(board);
  let brockCells = AnyCells(brock);

  let result = Array.from(new Array<CellDataType>(20), (_, rowIndex) => {
    return Array.from(new Array<CellDataType>(10), (_, columnIndex) => { 
      return new CellDataType(rowIndex, columnIndex);
    });
 });
 
  boardCells.forEach((x) => result[x.Row][x.Column].ClassName = x.ClassName);
  brockCells.forEach((x) => result[x.Row][x.Column].ClassName = x.ClassName);
  return result;
}

//消去可能なライン数をカウント
export const CountDelete = (board: CellDataType[][]) => {
  return 0;
}

//ブロックを消去
export const Delelte = (board: CellDataType[][]) => {
  return board;
}
