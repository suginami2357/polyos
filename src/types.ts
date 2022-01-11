
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
}

export type BoardType = {
  board: string[][],
}

export type NextType = {
  next: string[][],
}

export type ScoreType = {
  score: number,
}

