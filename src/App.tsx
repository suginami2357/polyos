import React, { useState } from "react";
import Game from "./pages/Game";

function App() {
  const[accelerate, setAccelerate] = useState<boolean>(false);
  const[step, setStep] = useState<number>(0);
  const[score, setScore] = useState<number>(0);
  const[board, setBoard] = useState<string[][]>([]);
  const[next, setNext] = useState<string[][]>([]);

  return (
    <div className="App">
        <Game
          accelerate={accelerate}
          setAccelerate={setAccelerate}
          step={step}
          setStep={setStep}
          score={score} setScore={setScore}
          board={board} setBoard={setBoard}
          next={next} setNext={setNext}
        />
    </div>
  );
}

export default App;
