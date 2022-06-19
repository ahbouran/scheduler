export function getAppointmentsForDay(state, day) {
  if (state === undefined || day === undefined) {
    return []
  }
  let selectedDays = [];
  let finalArray = [];
  
  for (let days of state.days) {
    if (days.name === day) {
      selectedDays = [...days.appointments]
    }
  }

  for (let index of selectedDays) {
    finalArray.push(state.appointments[index])
  }


return finalArray

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

