import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      setHistory([...history.slice(0, -1), newMode]);  
    } else {
      setHistory([...history, newMode])
    }

    setMode(newMode);
  }
  function back() {
  
    let newHistory = [...history];

    if (history.length >= 2) {
       newHistory.pop()
    }
    setHistory(newHistory);

    setMode(newHistory[newHistory.length - 1]);
  }
  return { mode, transition, back };
}
// : history[history.length - 1]