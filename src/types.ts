
export type GameType = {
  step: number,
  setBoard: React.Dispatch<React.SetStateAction<CellDataType[][]>>,
  board: CellDataType[][],
  setBrock: React.Dispatch<React.SetStateAction<CellDataType[][]>>,
  brock: CellDataType[][],
  setNext: React.Dispatch<React.SetStateAction<CellDataType[][]>>,
  next: CellDataType[][],
  score: number,
  length: number,
}

export type BoardType = {
  board: CellDataType[][],
  setBrock: React.Dispatch<React.SetStateAction<CellDataType[][]>>,
  brock: CellDataType[][],
}

export type NextType = {
  brock: CellDataType[][],
}

export type ScoreType = {
  score: number,
}

//interface

export interface LocationDataType {
  Row: number,
  Column: number,
}

export class CellDataType {
  constructor(row: number, column: number, className: string = ""){
    this.Row = row;
    this.Column = column;
    this.ClassName = className;
  }

  Row: number;
  Column: number;
  ClassName: string;

  Enpty(): boolean {
    return this.ClassName === ""
  }

  Any(): boolean {
    return !this.Enpty();
  }
}