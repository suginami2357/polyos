import { CellDataType } from "../types";

export const New = (rowLength: number, columnLength: number, row = 0, column = 0): CellDataType[][] => {
  return Array.from(new Array<CellDataType>(rowLength), (_, rowIndex) => {
    return Array.from(new Array<CellDataType>(columnLength), (_, columnIndex) => { 
      return new CellDataType(row + rowIndex, column + columnIndex) 
    });
 });
}

export const DeepCopy = (brock: CellDataType[][]): CellDataType[][] => {
  return brock.map((row) => row.map((cell) => {
    let result = new CellDataType(cell.Row, cell.Column);
    result.ClassName = cell.ClassName;
    return result;
  }))
}

export const AnyCells = (data: CellDataType[][]): CellDataType[] => {
  return data.flat().filter((cell) => cell.Any()); 
}