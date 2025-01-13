import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import cloudy from "./IMG/cloud.png";
import rainy from "./IMG/rain.png";
import sunny from "./IMG/clear.png";
import snowy from "./IMG/snow.png";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "dec6595addfeb6a6b105a662ef92bef8"; 

  //
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }
    setError(""); 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data); 
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null); 
    }
  };

  
  const getWeatherImage = (condition) => {
    if (!condition) return "";
    if (condition.includes("cloud")) return cloudy;
    if (condition.includes("rain")) return rainy;
    if (condition.includes("clear")) return  sunny;
    if (condition.includes("snow")) return snowy;
    return "default.jpg";
  };

  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <p>Get the current weather and see matching images!</p>
      </header>
      
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button onClick={fetchWeather} className="search-button">
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-container">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="weather-details">
              <p>
                <strong>Temperature:</strong> {Math.floor(weather.main.temp)}°C
              </p>
              <p>
                <strong>Weather:</strong> {weather.weather[0].description}
              </p>
              <p>
                <strong>Humidity:</strong> {weather.main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weather.wind.speed} m/s
              </p>
            </div>
            
            <div className="weather-image">
              <img
                src={getWeatherImage(weather.weather[0].description.toLowerCase())}
                alt={weather.weather[0].description}
              />
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>
          Powered by <a href="https://openweathermap.org/">OpenWeather</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
