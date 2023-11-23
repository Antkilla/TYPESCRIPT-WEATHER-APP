import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchWeatherByCity, fetchForecast } from './services/weatherServices';

interface WeatherData {
  temperature: number,
  description: string
  humidity: number
}

interface ForecastData {
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

function App() {

  let [weather, setWeather] = useState<WeatherData | null>(null);
  let [forecast, setForecast] = useState<Array<{
    time: string;
    temperature: number;
    description: string;
    humidity: number;
  }> | null>(null); 

  useEffect(() => {
    const getForecast = async () => {
      try {
        const forecastResponse = await fetchForecast("Boston");
        if (forecastResponse) {
          const upcomingForecast = forecastResponse.list.slice(0, 8).map((item) => ({
            time: item.dt_txt,
            temperature: item.main.temp,
            description: item.weather[0].description,
            humidity: item.main.humidity,
          }));
          
          setForecast(upcomingForecast);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getForecast();
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const weatherResponse = await fetchWeatherByCity("Boston");
        if (weatherResponse)  {
          setWeather({
            temperature: weatherResponse.main.temp,
            description: weatherResponse.weather[0].description,
            humidity: weatherResponse.main.humidity,
          })
        }
      } catch (error) {
        console.log(error);
      }
    }

    getWeather();
  }, []) 

  return (
    <div>
      <p>Temperature:</p>
      <p>{weather ? weather.temperature : "Loading..."}</p>
      <p>Description:</p>
      <p>{weather ? weather.description : "Loading..."}</p>
      <p>Humidity:</p>
      <p>{weather ? weather.humidity : "Loading..."}</p>
      
      <p>Forecast:</p>
      {forecast ? (
        forecast.map((item, index) => (
          <div key={index}>
            <p>Time: {item.time}</p>
            <p>Temperature: {item.temperature}</p>
            <p>Description: {item.description}</p>
            <p>Humidity: {item.humidity}</p>
          </div>
        ))
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
