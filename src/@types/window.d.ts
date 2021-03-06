interface Window {
  KeyDown: {
    [key: string]: boolean
  }

  swipe: {
    activate: boolean;
    move: boolean;
    start: {
      x: number,
      y: number,
    }
    curent: {
      x: number,
      y: number,
    }
  }
}
