import React, { useState } from "react";
import Game from "./pages/Game";

function App() {
  const[exclusion, setExclusion] = useState<boolean>(false);
  const[step, setStep] = useState<number>(0);
  const[score, setScore] = useState<number>(0);
  const[activate, setActivate] = useState<string[][]>([]);
  const[fixed, setFixed] = useState<string[][]>([]);
  const[next, setNext] = useState<string[][]>([]);
  const[hold, setHold] = useState<string[][]>([]);
  const[isHold, setIsHold] = useState<boolean>(false);

  return (
    <div className="App">
        <Game
          step={step}             setStep={setStep}
          exclusion={exclusion}   setExclusion={setExclusion}
          score={score}           setScore={setScore}
          active={activate}       setActive={setActivate}
          fixed={fixed}           setFixed={setFixed}
          next={next}             setNext={setNext}
          hold={hold}             setHold={setHold}
          isHold={isHold}         setIsHold={setIsHold}
        />
    </div>
  );
}

export default App;
