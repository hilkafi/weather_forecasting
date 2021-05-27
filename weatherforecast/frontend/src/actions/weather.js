import {GET_WEATHER, WEATHER_PENDING} from './types'
import axios from 'axios'

// CHECK TOKEN & LOAD USER
export const getWeather = (lat, lng) => dispatch => {

    dispatch({type: WEATHER_PENDING})

    const API_KEY = '8fed0b879f9231b657b4acaefefc5bdc'

    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&appid=${API_KEY}`)
      .then((res) => {
         // console.log(res.data)
        dispatch({
          type: GET_WEATHER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err)
      });
};
