import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Confirm';
import Empty from './Empty';




export default function Appointment(props) {
  return (
    <Fragment>
    <article className='appointment'></article>
      <Header time={props.time}/>
   
    </Fragment>
  );
}
