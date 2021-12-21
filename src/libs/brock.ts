import * as constant from "../constants"
import * as _types from "../types";
import * as _number from "./number";
import * as _cell from "./cell";

//生成
export const Falling = (score: number = 0) : _types.FallingBrockDataType[][] => {

  //枠を生成
  let result = Array.from(new Array<_types.FallingBrockDataType>(constant.Falling.height), (_, rowIndex) => {
    return Array.from(new Array<_types.FallingBrockDataType>(constant.Falling.width), (_, columnIndex) => { 
      return new _types.FallingBrockDataType(rowIndex, 3 + columnIndex) 
    });
 });

  // //真ん中をスタート地点とする
  let current = new _types.FallingBrockDataType(2, 2, 'block-type-core');
  result[current.row][current.column].className = current.className;

  //ランダムな大きさのブロックを生成
  let max = 5 + (score / 10)
  let length = _number.Random(4, max);
  for(let i = 1; i < length; i++){

    //端は移動出来ないので除外
    let choices: _types.FallingBrockDataType[] = [];
    if(0 < current.row){ choices.push(new _types.FallingBrockDataType(current.row - 1, current.column, 'block-color-black')) }
    if(0 < current.column){ choices.push(new _types.FallingBrockDataType(current.row, current.column - 1, 'block-color-black')) }
    if(current.row < 4){ choices.push(new _types.FallingBrockDataType(current.row + 1, current.column, 'block-color-black')) }
    if(current.column < 4){ choices.push(new _types.FallingBrockDataType(current.row, current.column + 1, 'block-color-black')) }
    
    //既に移動したセルを除外
    choices = choices.filter(x => result[x.row][x.column].Empty());

    //移動先が無ければ終了
    if (choices.length == 0){
      return result;
    }

    //一定確立で真ん中に戻してランダム性を持たせる
    let index = _number.Random(0, choices.length);
    if(index == choices.length){
      i--;
      current = new _types.FallingBrockDataType(2, 2);
      continue;
    }

    //色を塗る
    current = choices[index];
    result[current.row][current.column].className = current.className;
  }

  return result;
}

export const Fixed = () => {
  return Array.from(new Array<_types.FixedBrockDataType>(constant.Fixed.height), (_, rowIndex) => {
    return Array.from(new Array<FileCallback>(constant.Fixed.width), (_, columnIndex) => { 
      return new _types.FixedBrockDataType();
    });
 });
}

//落下
export const Fall = (
  score: number,
  fixed: _types.FixedBrockDataType[][], 
  falling: _types.FallingBrockDataType[][], 
  next: _types.FallingBrockDataType[][]): _types.ResultDataType => {

    //ゲームオーバー判定
    if(falling[2][2].row === 0  && Collision(fixed, falling)){
      alert("GameOver");
      window.KeyDown['ArrowDown'] = false;
      return new _types.ResultDataType(0, Fixed(), Falling(0), Falling(0));
    }

  let _score = score;
  let _fixed = _cell.DeepCopy(fixed);
  let _next = _cell.DeepCopy(next);

  //落下ブロックを１つ下へ
  let down = _cell.DeepCopy(falling).map((row) => row.map((x) => {x.row++; return x;}));

  //ブロックが接触しない場合
  if(!Collision(_fixed, down)){
    return new _types.ResultDataType(_score,_fixed, down, next)
  }
  

  //落下ブロックを固定ブロックへ加える
  _cell.AnyCells(falling).forEach((cell) => {
    _fixed[cell.row][cell.column].className = cell.className;
  })

  for(let i = 0; i < _fixed.length; i++){
    let row = _fixed[i];

    //空白が存在する場合は何もしない
    if(row.some(x => x.Empty())){
      continue;
    }

    //スコアのカウント
    _score += row.filter(x => x.Core()).length;

    //ブロック消去
    _fixed.splice(i, 1);
    _fixed.unshift(Array.from(new Array<_types.FixedBrockDataType>(row.length), x =>  new _types.FixedBrockDataType()));
  }

  return new _types.ResultDataType(_score, _fixed, _next, Falling(score))
}

//接触判定
export const Collision = (fixed: _types.FixedBrockDataType[][], falling: _types.FallingBrockDataType[][]): boolean => {
  return _cell.AnyCells(falling).some(x => x.row >= constant.Fixed.height || fixed[x.row][x.column].Any());
}

//回転
export const Rotate = (fixed: _types.FixedBrockDataType[][], falling: _types.FallingBrockDataType[][]): _types.FallingBrockDataType[][] => {
  let result = _cell.DeepCopy(falling);
  result = result.map((line) => line.map((cell) => {
    let axis = falling[2][2];
    let row = axis.row + (cell.column - axis.column);
    let column = axis.column - (cell.row - axis.row);
    return new _types.FallingBrockDataType(row, column, cell.className)
  }))

  if(_cell.AnyCells(result).some(x => x.column <= 0 || x.column >= constant.Fixed.width)){
    return falling;
  }

  if(_cell.AnyCells(result).some(x => x.row < 0 || x.row >= constant.Fixed.height)){
    return falling;
  }

  if(Collision(fixed, result)){
    return falling;
  }
  return result;
}

//左移動
export const Left = (fixed: _types.FixedBrockDataType[][], falling: _types.FallingBrockDataType[][]): _types.FallingBrockDataType[][] => {
  if(_cell.AnyCells(falling).some(x => x.column == 0)){
    return falling;
  }

  let result = _cell.DeepCopy(falling);
  result.flat().forEach(x => x.column--);
  if(Collision(fixed, result)){
    return falling;
  }
  return result;
}

//右移動
export const Right = (fixed: _types.FixedBrockDataType[][], falling: _types.FallingBrockDataType[][]): _types.FallingBrockDataType[][] => {
  if(_cell.AnyCells(falling).some(x => x.column == fixed[0].length - 1)){
    return falling;
  }

  let result = _cell.DeepCopy(falling);
  result.flat().forEach(x => x.column++);
  if(Collision(fixed, result)){
    return falling;
  }
  return result;
}


