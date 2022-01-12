
export type GameType = {
  accelerate: boolean,
  setAccelerate: React.Dispatch<React.SetStateAction<boolean>>,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  board: string[][],
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>,
  next: string[][],
  setNext: React.Dispatch<React.SetStateAction<string[][]>>,
  hold: string[][],
  setHold: React.Dispatch<React.SetStateAction<string[][]>>, 
}

export type ScoreType = {
  value: number,
}

export type BoardType = {
  value: string[][],
}

export type NextType = {
  value: string[][],
}

export type HoldType = {
  value: string[][]
}

