
export type GameType = {
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  exclusion: boolean,
  setExclusion: React.Dispatch<React.SetStateAction<boolean>>,
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  active: string[][],
  setActive: React.Dispatch<React.SetStateAction<string[][]>>,
  fixed: string[][],
  setFixed: React.Dispatch<React.SetStateAction<string[][]>>,
  next: string[][],
  setNext: React.Dispatch<React.SetStateAction<string[][]>>,
  hold: string[][],
  setHold: React.Dispatch<React.SetStateAction<string[][]>>,
  isHold: boolean,
  setIsHold: React.Dispatch<React.SetStateAction<boolean>>,
}

export type ScoreType = {
  value: number,
}

export type BoardType = {
  active: string[][],
  fixed: string[][],
}

export type NextType = {
  value: string[][],
}

export type HoldType = {
  value: string[][],
}

