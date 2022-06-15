import React from 'react';

import "components/DayListItem.scss";

import classNames from "classnames";


export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    ' day-list__item--selected': props.selected === true,
    ' day-list__item--full': props.spots === 0
  })


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h2 className='text--light'>{props.spots} spots remaining</h2>
    </li>
  );
}
