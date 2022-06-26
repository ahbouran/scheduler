import { useState, useEffect } from 'react'
import axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const getDaysURL = "/api/days";
    const getAppointmentsURL = "/api/appointments";
    const getInterviewersURL = "/api/interviewers";

    Promise.all([
      axios.get(getDaysURL),
      axios.get(getAppointmentsURL),
      axios.get(getInterviewersURL)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const updateSpots = (state) => {
    const dayToChange = state.days.find((day) => day.name === state.day);
    const newDay = {...dayToChange};

    const emptyAppointments = dayToChange.appointments.filter((appointmentId) => !state.appointments[appointmentId].interview);

    const spots = emptyAppointments.length

    newDay.spots = spots;

    const newDaysArr = [...state.days];

    const dayIndex = state.days.findIndex((day) => day.name === state.day);

    newDaysArr[dayIndex] = newDay;


    const newState = {...state};
    newState.days = newDaysArr;

    return newState;

  };


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const stateCopy = {...state, appointments};
        setState(updateSpots(stateCopy));
      })
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const stateCopy = {...state, appointments};
        setState(updateSpots(stateCopy));
      })
  }
  return { state, setDay, bookInterview, cancelInterview }
}

