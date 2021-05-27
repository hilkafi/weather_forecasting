import {
    GET_WEATHER,
    WEATHER_PENDING
  } from '../actions/types';
  
  const initialState = {
    weather: null,
    forecast_pending: false,
    show_result: false
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case WEATHER_PENDING:
        return {
          ...state,
          forecast_pending: true,
          show_result: false
        };
      case GET_WEATHER:
        return {
          ...state,
          weather: action.payload,
          forecast_pending: false,
          show_result: true
        };
      default:
        return state;
    }
  }