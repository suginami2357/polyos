import React from 'react';
import { useState, useEffect, useRef } from "react";
import Game from "./pages/Game";
import * as _brock from "./libs/brock";
import * as _types from "./types";

function App() {
  const[step, setStep] = useState<number>(0);
  const[score, setScore] = useState<number>(0);
  const[fixed, setFixed] = useState<_types.FixedBrockDataType[][]>(_brock.Fixed());
  const[falling, setFalling] = useState<_types.FallingBrockDataType[][]>(_brock.Falling());
  const[next, setNext] = useState<_types.FallingBrockDataType[][]>(_brock.Falling());

  const[accelerate, setAccelerate] = useState<boolean>(false);


  const ref = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    window.KeyDown = {};
    window.Swipe = {
      isMove: false, 
      X: 0,
      Y: 0,
    }
  },[])

  useEffect(() => {
    (async() => {
      let time = accelerate ? 25 : Math.max(100, 500 - (score * 5));
      await new Promise(r => setTimeout(r, time));
      setStep(step + 1);
    })();
  }, [step])
//-- EventHandler

//--タッチ操作
  window.ontouchstart = (e) => {
    e.preventDefault();

    window.Swipe.X = e.touches[0].pageX;
    window.Swipe.Y = e.touches[0].pageY;
  }

  window.ontouchmove = (e) => {
    e.preventDefault();

    window.Swipe.isMove = true;
    let touch = e.touches[0];

    if(ref.current === null){
      return;
    }
    let leftBorder = ref.current.offsetLeft -5;
    let rightBorder = ref.current.offsetLeft + ref.current.offsetWidth + 5;

    //左にスワイプ
    if(touch.pageX < leftBorder){
      setFalling(_brock.Left(fixed, falling));
      setAccelerate(false);
      window.Swipe.Y = touch.pageY;
    } 
    //右にスワイプ
    else if(touch.pageX > rightBorder + 1){
      setFalling(_brock.Right(fixed, falling));
      setAccelerate(false);
      window.Swipe.Y = touch.pageY;
    }
    //下にスワイプ
    else if(touch.pageY > window.Swipe.Y){
      setAccelerate(true);
    }
  }

  window.ontouchend = (e) => {
    e.preventDefault();

    setAccelerate(false);
    if(!window.Swipe.isMove){
      setFalling(_brock.Rotate(fixed, falling));
    }
    window.Swipe.isMove = false;
  }

//-- キーボード操作
  window.onkeydown = (e) => {
    if(window.KeyDown[e.key]){ 
      return; 
    } 
    window.KeyDown[e.key] = true;
    
    switch (e.key) {
      case 'ArrowUp':
        setFalling(_brock.Rotate(fixed, falling));
        break;

        case 'ArrowDown':
          setAccelerate(true);
          break;

      case 'ArrowLeft':
        setFalling(_brock.Left(fixed, falling));
        break;

      case 'ArrowRight':
        setFalling(_brock.Right(fixed, falling));
        break;
    }
  }

  window.onkeyup = (e) => {
    window.KeyDown[e.key] = false;
    setAccelerate(false);
  }

  return (
    <div className="App">
      <Game 
        ref={ref} 
        step={step} 
        setFixed={setFixed} 
        fixed={fixed} 
        setFalling={setFalling} 
        falling={falling} 
        setNext={setNext} 
        next={next} 
        setScore={setScore} 
        score={score} 
      />
    </div>
  );
}

export default App;
