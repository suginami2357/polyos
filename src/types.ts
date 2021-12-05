
export type GameType = {
  board: CellDataType[][],
  current: CellDataType[][],
  next: CellDataType[][],
  score: number,
}

export type BoardType = {
  board: CellDataType[][],
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
  constructor(row: number, column: number){
    this.Row = row;
    this.Column = column;
  }

  Row: number = 0;
  Column: number = 0;
  Class: string = "";

  Enpty(): boolean {
    return this.Class == ""
  }
}