import { CellDataType } from "../types"

//接触判定
export const IsCollision = (board: CellDataType[][], brock: CellDataType[][]) => {
  return false;
}

//ブロックをボートに加える
export const Marge = (board: CellDataType[][], brock: CellDataType[][]) => {
    return board;
}

//消去可能なライン数をカウント
export const CountDelete = (board: CellDataType[][]) => {
  return 0;
}

//ブロックを消去
export const Delelte = (board: CellDataType[][]) => {
  return board;
}