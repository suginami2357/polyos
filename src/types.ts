
export type GameType = {
  step: number,
  setFixed: React.Dispatch<React.SetStateAction<FixedBrockDataType[][]>>,
  fixed: FixedBrockDataType[][],
  setFalling: React.Dispatch<React.SetStateAction<FallingBrockDataType[][]>>,
  falling: FallingBrockDataType[][],
  setNext: React.Dispatch<React.SetStateAction<FallingBrockDataType[][]>>,
  next: FallingBrockDataType[][],
  setScore: React.Dispatch<React.SetStateAction<number>>,
  score: number,
}

export type BoardType = {
  fixed: FixedBrockDataType[][],
  falling: FallingBrockDataType[][],
}

export type NextType = {
  next: FallingBrockDataType[][],
}

export type ScoreType = {
  score: number,
}

//ブロックの基底クラス
export class BrockDataType {
  constructor(private _className: string){}

  get className(): string {
    return this._className;
  }
  set className(value: string) {
    this._className = value;
  }

  Empty(): boolean {
    return this._className === "";
  }

  Any(): boolean {
    return !this.Empty();
  }

  Core(): boolean {
    return this.className === "block-type-core";
  }
}

//落下ブロック
export class FallingBrockDataType extends BrockDataType {
  constructor(private _row: number, private _column: number, _className: string = ""){
    super(_className);
  }

  get row(): number {
    return this._row;
  }
  set row(value: number) {
    this._row = value;
  }

  get column(): number {
    return this._column;
  }
  set column(value: number) {
    this._column = value;
  }
}

//固定ブロック
export class FixedBrockDataType extends BrockDataType {
  constructor(_className: string = ""){
    super(_className);
  }
}

export class ResultDataType{
  constructor(
    private _score: number,
    private _fixed: FixedBrockDataType[][], 
    private _falling: FallingBrockDataType[][],
    private _next: FallingBrockDataType[][]
  ){}
    get score(): number{ return this._score; }
    get fixed(): FixedBrockDataType[][]{ return this._fixed; }
    get falling(): FallingBrockDataType[][]{ return this._falling; }
    get next(): FallingBrockDataType[][]{ return this._next; }
}
