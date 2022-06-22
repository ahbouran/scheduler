export function getAppointmentsForDay(state, day) {
  if (state === undefined || day === undefined) {
    return []
  }

  let results = [];
  
  const dayObj = state.days.find((d) => d.name === day)
  if (!dayObj) {
    return []
  };

  for (let id of dayObj.appointments) {
    results.push(state.appointments[id])
  }


return results

};


export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  const interviewerObject = {
    student: interview.student,
  }

  let index = interview.interviewer;
  interviewerObject.interviewer = state.interviewers[index]


  return interviewerObject;

};

export function getInterviewersForDay(state, day) {
  if (state === undefined || day === undefined) {
    return []
  }

  let results = [];
  
  const dayObj = state.days.find((d) => d.name === day)
  if (!dayObj) {
    return []
  };

  for (let id of dayObj.interviewers) {
    results.push(state.interviewers[id])
  }


return results

};
