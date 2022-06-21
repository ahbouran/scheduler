import { react, useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      setHistory([...history.slice(0, -1), newMode]);  
    } else {
      setHistory([...history, newMode])
    }

    // return setMode(newMode);
  }
  function back() {
    if (history.length < 2) {
       return
    }
    setHistory(history.slice(0, -1));
    // setMode(history[history.length - 1]);
  }
  return { mode: history[history.length - 1], transition, back };
}
