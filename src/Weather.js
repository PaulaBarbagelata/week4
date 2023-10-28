import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";

export default function SearchEngine() {
  const [defaultCity] = useState("New York"); // Ciudad predeterminada, sin useState para que no sea modificable
  const [city, setCity] = useState(defaultCity); // Ciudad actual
  const [searchResult, setSearchResult] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  async function getWeatherData(city) {
    try {
      const apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);
      const data = response.data;
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const hum = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weatherIcon = data.weather[0].icon;

      setTemperature(temp);
      setDescription(desc);
      setHumidity(hum);
      setWind(windSpeed);
      setIcon(weatherIcon);

      setSearchResult(`The temperature in ${city} is ${temp}°C.`);
    } catch (error) {
      setSearchResult("Error fetching weather data");
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getWeatherData(city); // Cargar los datos de la ciudad actual al cargar la página
  }, [city]);

  function handleSubmit(event) {
    event.preventDefault();
    if (city) {
      getWeatherData(city);
    } else {
      setSearchResult("Please enter a city name");
    }
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Weather">
      <div>
        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input type="search" onChange={updateCity} value={city} />
            </div>
            <div className="col-3">
              <input type="submit" value="Search" />
            </div>
          </div>
        </form>
      <div className="overview">
        <h1>{searchResult}</h1>
        <ul className="detail">
          
          <li>{description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="clearfix weather-temperature temp">
            <img
               src={`https://openweathermap.org/img/w/${icon}.png`}
               alt="Weather Icon"
              className="float-left"
            />
            <div className="float-left">
              <strong>{temperature}</strong>
              
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul className="detail">
            <li>Humidity: {humidity}%</li>
            <li>Wind Speed: {wind} km/h</li>
          </ul>
          </div>
      </div>
    </div>
    </div>
  );
}