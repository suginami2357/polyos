interface Window {
  KeyDown: {
    [key: string]: boolean
  }

  Swipe: {
    isMove: boolean;
    X: number,
    Y: number,
  }
}
