import React, { useEffect, useState } from 'react';
import './App.css';
import fetchWeatherByCity from './services/weatherServices';

interface WeatherData {
  temperature: number,
  description: string
  humidity: number
}

function App() {

  let [weather, setWeather] = useState<WeatherData | null>(null);


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
      <p>{weather ? weather.humidity: "Loading..."}</p>
    </div>
  );
}

export default App;


