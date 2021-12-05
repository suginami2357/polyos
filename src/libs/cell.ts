import { CellDataType } from "../types";

export const New = (rowLength: number, columnLength: number, row = 0, column = 0) => {
  return Array.from(new Array<CellDataType>(rowLength), (_, rowIndex) => {
    return Array.from(new Array<CellDataType>(columnLength), (_, columnIndex) => { 
      return new CellDataType(row + rowIndex, column + columnIndex) 
    });
 });
}
