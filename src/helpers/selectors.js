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

}