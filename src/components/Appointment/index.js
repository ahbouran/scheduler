import React from "react";
import useVisualMode from '../../hooks/useVisualMode'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from './Error'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EDIT = "ERROR_";


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
   
    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true));
  };

  function areYouSure() {
    transition(CONFIRM);
  };

  function reallyDelete() {
    transition(DELETE, true)
    props.cancelInterview(props.id).then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  };

  function edit() {
    transition(EDIT);
  };

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
          student={props.interview.student}
          interviewer={props.interview.interviewer ? props.interview.interviewer.id : null}
          interviewers={props.interviewers}
          onSave={edit}
          onCancel={() => transition(SHOW)}
        ></Form>
      )}
      {mode === SHOW && props.interview && (
        <Show
          name={props.interview.student}
          interviewers={props.interview.interviewer}
          onDelete={areYouSure}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message='Error saving appointment.' onClose={() => transition(CREATE)}></Error>
      )}
      {mode === ERROR_DELETE && (
        <Error message='Error deleting appointment.' onClose={() => transition(SHOW)}></Error>
      )}
    </article>
  );
}

