import { LocationDataType } from "../types";
import { CellDataType } from "../types";
import { New } from "./cell";
import { Random } from "./number";
import { DeepCopy, AnyCells } from "./cell";
import { Collision } from "./board";

//生成
export const Generate = (length: number) : CellDataType[][] => {
  //枠を生成
  let brock = New(5, 5, 0, 3);

  //真ん中をスタート地点とする
  let location: LocationDataType = {Row: 2, Column: 2}
  brock[location.Row][location.Column].ClassName = 'block-type-red';

  for(let i = 0; i < length; i++){

    //端は移動出来ないので除外
    let choices: LocationDataType[] = [];
    if(0 < location.Row){　choices.push({Row: location.Row - 1, Column: location.Column});　}
    if(0 < location.Column){　choices.push({Row: location.Row, Column: location.Column - 1});　}
    if(location.Row < 4){　choices.push({Row: location.Row + 1, Column: location.Column});　}
    if(location.Column < 4){　choices.push({Row: location.Row, Column: location.Column + 1});　}
    
    //既に移動したセルも除外
    choices = choices.filter(x => brock[x.Row][x.Column].Enpty());

    //移動先が無ければ終了
    if (choices.length == 0){
      return brock;
    }

    //一定確立で真ん中に戻してランダム性を持たせる
    let index = Random(choices.length + 1);
    if(index == choices.length){
      i--;
      location = {Row: 2, Column: 2}
      continue;
    }

    //色を塗る
    location = {Row: choices[index].Row, Column: choices[index].Column}
    brock[location.Row][location.Column].ClassName = 'block-color-black';
  }
  return brock;
}

//落下
export const Fall = (brock: CellDataType[][]): CellDataType[][] => {
  let result = DeepCopy(brock);
  result.flat().forEach(x => x.Row++);
  return result;
}

//回転
export const Rotate = (board: CellDataType[][], brock: CellDataType[][]): CellDataType[][] => {
  let result = brock.map((line) => line.map((cell) => {
    let axis = brock[2][2];
    let row = axis.Row - (cell.Column - axis.Column);
    let column = axis.Column + (cell.Row - axis.Row);
    return new CellDataType(row, column, cell.ClassName)
  }))

  if(AnyCells(result).some(x => x.Column < 0 || x.Column > 9)){
    return brock;
  }

  if(AnyCells(result).some(x => x.Row < 0 || x.Row > 19)){
    return brock;
  }

  if(Collision(board, result)){
    return brock;
  }
  return result;
}

//ハードドロップ
export const HardDrop = (board: CellDataType[][], brock: CellDataType[][]) => {
  //落下中ブロックの一番下の row を取得
  let src = Math.min(...brock.flat().map(x => x.Row));

  //落下中ブロックの column 内で一番上の row を取得
  let dest = Math.min(...board.flat().filter(x => brock.flat().map(x => x.Column).includes(x.Column)).map(x => x.Row));

  brock.map((row) => {
    row.map((cell) => {
      cell.Column += dest - src;
    })
  })
  return brock;
}

//左移動
export const Left = (board: CellDataType[][], brock: CellDataType[][]): CellDataType[][] => {
  if(AnyCells(brock).some(x => x.Column <= 0)){
    return brock;
  }

  let result = DeepCopy(brock);
  result.flat().forEach(x => x.Column--);
  if(Collision(board, result)){
    return brock;
  }
  return result;
}

//右移動
export const Right = (board: CellDataType[][], brock: CellDataType[][]): CellDataType[][] => {
  if(AnyCells(brock).some(x => x.Column >= 9)){
    return brock;
  }

  let result = DeepCopy(brock);
  result.flat().forEach(x => x.Column++);
  if(Collision(board, result)){
    return brock;
  }
  return result;
}
