import { FallingBrockDataType, FixedBrockDataType } from "../types";
import * as constant from "../constants"

export function DeepCopy(brock: FallingBrockDataType[][]): FallingBrockDataType[][];
export function DeepCopy(brock: FixedBrockDataType[][]): FixedBrockDataType[][];

export function DeepCopy(brock: any[][]): any {
  return brock.map((row)=> row.map((cell) => {
    if(cell instanceof FixedBrockDataType){
      return new FixedBrockDataType(cell.className);
    }
    if(cell instanceof FallingBrockDataType){
      return new FallingBrockDataType(cell.row, cell.column, cell.className);
    }
  }));
}

export const AnyCells = (falling: FallingBrockDataType[][]): FallingBrockDataType[] => {
  return falling.flat().filter((cell) => 
    (0 <= cell.row     && cell.row     <= constant.Fixed.height) &&
    (0 <= cell.column  && cell.column  <= constant.Fixed.width) &&
    cell.Any()
  ); 
}