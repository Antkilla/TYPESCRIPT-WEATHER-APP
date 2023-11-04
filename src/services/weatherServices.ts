import axios from "axios";
//const axios = require('axios'); //old way, only necessary to test

const Base_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const fetchWeatherByCity = async (city: string) => {
    try {
        const response = await axios.get(`${Base_URL}`, {
            params: {
                q: city, 
                units: "imperial",
                appid: API_KEY
            }
        });
        return response.data;
    }   catch (error) {
        console.error("Error fetching Data: ", error);
        //always have api call related functions return something 
        return null;
    }
}

//console.log(fetchWeatherByCity('Boston').weather[0].description);
export default fetchWeatherByCity;