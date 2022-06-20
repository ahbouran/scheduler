import React, { Fragment, useState } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
// import useVisualMode from '../hooks/useVisualMode'

const useVisualMode = function (initial) {
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


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';



export default function Appointment(props) {
  
  console.log('props:', props)
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    
    <article className='appointment'>
      <Header time={props.time} /> 
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
        name={props.interview.student}
        interviewers={props.interview.interviewer.name}
      />
)}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()}/>}
    </article>
  );
}


// {props.interview ? <Show name={props.interview.student} interviewers={props.interview.interviewer.name}/> : <Empty />}