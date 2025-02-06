import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import pic1 from "../assets/image/search.png";
import clear_icon from "../assets/image/clear.png";
import cloud_icon from "../assets/image/cloud.png";
import drizzle_icon from "../assets/image/drizzle.png";
import rain_icon from "../assets/image/rain.png";
import snow_icon from "../assets/image/snow.png";
import humidity_icon from "../assets/image/humidity.png";
import wind_icon from "../assets/image/wind.png";
import toast from "react-hot-toast";

const Weather = () => {
  const [city, setCity] = useState(false);
  const ref = useRef(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      toast.error("Please enter a city");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setCity({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
      ref.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div>
      <div className="weather-container">
        <div className="weather-content">
          <div className="weather-main">
            <input
              ref={ref}
              type="text"
              placeholder="Search"
              className="weather-input"
            />
            <img
              src={pic1}
              alt=""
              className="weather-icon"
              onClick={() => search(ref.current.value)}
            />
          </div>
          <div className="weather-forecast">
            <img src={city.icon} alt="" className="forecast-icon" />
          </div>
          <div className="weather-degree">
            <h1 className="degree">{city.temprature}°C</h1>
            <p className="place">{city.location}</p>
          </div>
          <div className="weather-speeds">
            <div className="humidity">
              <img src={humidity_icon} alt="" className="humidity-icon" />
              <div className="humidity-content">
                <p className="parcentage">{city.humidity} %</p>
                <p className="humidity-text">Humidity</p>
              </div>
            </div>
            <div className="wind">
              <img src={wind_icon} alt="" className="wind-icon" />
              <div className="wind-content">
                <p className="wind-speed">{city.wind} km/h</p>
                <p className="wind-text">Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
