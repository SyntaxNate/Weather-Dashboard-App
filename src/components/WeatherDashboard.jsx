import React, { useState } from "react";  

const WeatherDashboard = () => {
    
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    const [error, setError] = useState("");

    const apiKey = "fe1144d4f3e03a5b647247dd13f57d1c"

    const fetchWeather = async () => {
        if(!city) return;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
                if(!response.ok) throw new Error("City not found");

                const data = await response.json();
                                    setWeatherData(data);
                                    setError("");
                                }   catch (err) {
                                    setWeatherData(null);
                                    setError(err.message);
                                }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h1>Weather Dashboard</h1>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
    
          {error && <p style={{ color: "red" }}>{error}</p>}
    
          {weatherData && (
            <div style={{ marginTop: "20px" }}>
              <h2>{weatherData.name}</h2>
              <p>Temperature: {weatherData.main.temp} °F</p>
              <p>Humidity: {weatherData.main.humidity} %</p>
              <p>Condition: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      );

};

export default WeatherDashboard;