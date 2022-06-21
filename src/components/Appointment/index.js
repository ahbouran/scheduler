import React, { Fragment, useState } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
// import useVisualMode from '../hooks/useVisualMode'

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      history.pop();
    }
    history.push(newMode);

    return setMode(newMode);
  }
  function back() {
    if (mode === initial) {
      return setMode(mode);
    }
    history.pop();
    return setMode(history[history.length - 1]);
  }
  return { mode, transition, back };
};

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("props in appointment: ", props);
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function areYouSure() {
    transition(CONFIRM);

    // props.cancelInterview(props.id).then(() => transition(DELETING))
    // transition(EMPTY)
  }

  function reallyDelete() {
    transition(DELETE)
    return props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  function edit() {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SAVE && <Status message="Saving"> </Status>}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => {reallyDelete()}}
          onCancel={() => back()}
          message="Are you sure about that?"
        >
          {" "}
        </Confirm>
      )}
      {mode === DELETE && <Status message="Deleting"> </Status>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        ></Form>
      )}
      {mode === SHOW && props.interview && (
        <Show
          name={props.interview.student}
          interviewers={props.interview.interviewer.name}
          onDelete={areYouSure}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
}

// {props.interview ? <Show name={props.interview.student} interviewers={props.interview.interviewer.name}/> : <Empty />}
