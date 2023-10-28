import React, { useState} from "react";
import axios from "axios";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [ setTemperature] = useState(null);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      <ul>
        <li>{searchResult}</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind Speed: {wind} km/h</li>
      </ul>
      {icon && (
        <img
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt="Weather Icon"
        />
      )}
    </div>
  );
}
