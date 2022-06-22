import React, { useState, useEffect } from 'react'
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
    const getDaysURL = "http://localhost:8001/api/days";
    const getAppointmentsURL = "http://localhost:8001/api/appointments";
    const getInterviewersURL = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(getDaysURL),
      axios.get(getAppointmentsURL),
      axios.get(getInterviewersURL)
    ]).then((all) => {
      setState({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  const updateSpots = (state) => {
    // loop through the state.days array and find the name where  the day is equal to state.day in line 6
    const dayToChange = state.days.find((day) => day.name === state.day);
    //create a completely new to avoid mutating state
    const newDay = {...dayToChange};

    //find empty appointments by looking through the specific appointments
    const emptyAppointments = dayToChange.appointments.filter((appointmentId) => !state.appointments[appointmentId].interview);

    //update the spots with the interviews that are set to null
    const spots = emptyAppointments.length

    newDay.spots = spots;

    //Copy the enire state.days array
    const newDaysArr = [...state.days];

    //find the index where the specific day is 
    const dayIndex = state.days.findIndex((day) => day.name === state.day);

    //change the value of that day with the newDay with the updated spots
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

