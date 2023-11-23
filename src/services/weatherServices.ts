import axios from "axios";  //import axios to fetch api info (doesn't have to be axios but its the most common)
//const axios = require('axios'); //old way, only necessary to test

interface ForecastAPIResponse {
    list:   {
        dt_txt: string;
        main: {
          temp: number;
          humidity: number;
        };
        weather: [
          {
            description: string;
          }
        ];
    } [];
}

const Base_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY


const fetchForecast = async (city: string): Promise<ForecastAPIResponse | null> => {
    try {
        const response = await axios.get(`${Base_URL}`, {
            params: {
                q: city,
                units: "imperial",
                appid: API_KEY,
            }
        }); 
        return response.data;        
    }   catch (error) {
        console.error("Error fetching forecast data: ", error);
        return null;
    }
};

//create an interface to specify what the api response looks like(typescript only)
//my weatherapi response adhere to shape the criteria 
//specifies what something should have, doesn't care what it might have
interface WeatherAPIResponse{
    main: {
        temp: number;
        humidity: number
    }
    weather: [{
        description: string;
    }];
}   


const fetchWeatherByCity = async (city: string): Promise<WeatherAPIResponse | null> => {  //returns => //promise<this | promsie>that
    //always good practice to use try/catch when calling an api
    //error handling 
    console.log("fetchWeatherByCity had run");
    try {
        const response = await axios.get(`${Base_URL}weather`, {
            params: {
                q: city, 
                units: "imperial",
                appid: API_KEY, 
            }
        });
        return response.data;
    }   catch (error) {         //if there is an error it can give you more ifo on it while still running the code 
        console.error("Error fetching Data: ", error);
        //always have api call related functions return something 
        return null;
    }
}

//console.log(fetchWeatherByCity('Boston').weather[0].description);
export { fetchWeatherByCity, fetchForecast }