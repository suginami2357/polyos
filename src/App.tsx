import React, { useState } from "react";
import Game from "./pages/Game";
import * as constants from "./constants";

function App() {
  const[accelerate, setAccelerate] = useState<boolean>(false);
  const[step, setStep] = useState<number>(0);
  const[score, setScore] = useState<number>(0);
  const[board, setBoard] = useState<string[][]>([]);
  const[activate, setActivate] = useState<string[][]>([]);
  const[fixed, setFixed] = useState<string[][]>([]);
  const[next, setNext] = useState<string[][]>([]);
  const[hold, setHold] = useState<string[][]>([]);
  const[isHold, setIsHold] = useState<boolean>(false);

  return (
    <div className="App">
        <Game
          accelerate={accelerate}
          setAccelerate={setAccelerate}
          step={step}
          setStep={setStep}
          score={score} setScore={setScore}
          active={activate} setActive={setActivate}
          fixed={fixed} setFixed={setFixed}
          // board={board} setBoard={setBoard}
          next={next} setNext={setNext}
          hold={hold} setHold={setHold}
          isHold={isHold} setIsHold={setIsHold}
        />
    </div>
  );
}

export default App;
