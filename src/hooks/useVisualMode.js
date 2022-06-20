import { react, useState } from 'react'; 

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace === true) {
     history.pop()
    }
    history.push(newMode)

    return setMode(newMode)
    
  }
  function back() {
    if (mode === initial) {
      return setMode(mode)
    }
    history.pop()
    return setMode(history[history.length - 1])
  }
  return { mode, transition, back };
};

