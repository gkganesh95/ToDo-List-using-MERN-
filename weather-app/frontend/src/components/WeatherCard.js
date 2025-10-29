import React from "react";

const WeatherCard = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80">
      <h2 className="text-2xl font-semibold">{data.city}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="icon"
        className="mx-auto"
      />
      <p className="text-lg capitalize">{data.description}</p>
      <p>🌡 Temperature: {data.temperature}°C</p>
      <p>💧 Humidity: {data.humidity}%</p>
      <p>💨 Wind: {data.wind} m/s</p>
    </div>
  );
};

export default WeatherCard;
