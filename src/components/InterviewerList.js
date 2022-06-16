import React from 'react'
import InterviewerListItem from './InterviewerListItem';

import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  console.log('props ', props)

  const interviewerList = props.interviewers.map((interviewer) => {
    
    return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer} //value?
      setInterviewer= {() => props.setInterviewer(interviewer.id)} //onChange? 
    />
    )
  })

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul>{interviewerList}</ul>
</section>
  )
}
