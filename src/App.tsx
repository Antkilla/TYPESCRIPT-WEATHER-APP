import React from 'react';
import logo from './logo.svg';
import './App.css';
import fetchWeatherByCity from './services/weatherServices';

function App() {
  return (
    <div>
      {JSON.stringify(fetchWeatherByCity('Boston'))}
    </div>
  );
}

export default App;
