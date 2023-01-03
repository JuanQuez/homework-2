import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setweatherData] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ee81dec0a140c5e2180bd102fa393422`
        )
        .then((res) => setweatherData(res.data));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const celsius = Math.round(weatherData.main?.temp - 273.15);
  const fahrenheit = Math.round(1.8 * celsius + 32);

  const changeUnitsTemp = () => {
    setIsCelsius(!isCelsius);
  };

  console.log(weatherData);
  return (
    <div className="target-weather">
      <h1>Weather App</h1>
      <h2>
        {weatherData.name}
        {", "} {weatherData.sys?.country}
        {"."}
      </h2>
      <section className="weather-information">
        <div className="icon-weather">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`}
            alt="icon weather"
          />
          <p>
            <em>{weatherData.weather?.[0].description}</em>
          </p>
        </div>
        <div className="list-section">
          <ul>
            <li>
              <strong>Humidity:</strong> {weatherData.main?.humidity}
              {"%"}
            </li>
            <li>
              <strong>Clouds:</strong> {weatherData.clouds?.all}
              {"%"}
            </li>
            <li>
              <strong>Wind:</strong> {weatherData.wind?.speed} {"m/s"}
            </li>
          </ul>
        </div>
      </section>
      <div className="degrees">
        <h2>
          {isCelsius ? celsius : fahrenheit} {isCelsius ? "°C" : "°F"}
        </h2>
      </div>
      <div className="div-buttom">
        <button className="desing-button" onClick={changeUnitsTemp}>
          Degrees °C/°F
        </button>
      </div>
      <span className="top"></span>
      <span className="right"></span>
      <span className="bottom"></span>
      <span className="left"></span>
    </div>
  );
};

export default Weather;
