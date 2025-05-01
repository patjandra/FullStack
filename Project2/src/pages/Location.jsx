import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Location() {
  const [city, setCity] = useState("");
  const { currentWeather, loading, error, fetchWeather, saveCity } = useWeather();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      await fetchWeather(city.trim());
    }
  };

  const handleSave = async () => {
    if (currentWeather) {
      await saveCity(currentWeather.city);
    }
  };

  return (
    <div className="center-card">
      <div className="glass-card location-search-card">
        <div className="location-search-row">
          <input
            className="location-search-input"
            placeholder="Search for a city!"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
          <button className="location-search-btn" onClick={handleSearch}>Enter</button>
          <button
            className="location-search-btn"
            onClick={handleSave}
            disabled={!currentWeather}
          >
            Save
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      
      {loading ? (
        <div className="glass-card location-weather-card">
          <div className="weather-grid">
            <div className="loading">Loading...</div>
          </div>
        </div>
      ) : currentWeather ? (
        <div className="glass-card location-weather-card">
          <div className="weather-grid">
            <div>
              <div className="weather-header">Temperature</div>
              <div className="weather-value">{currentWeather.temperature}°F</div>
            </div>
            <div>
              <div className="weather-header">Condition</div>
              <div className="weather-value">{currentWeather.condition}</div>
            </div>
            <div>
              <div className="weather-header">Humidity</div>
              <div className="weather-value">{currentWeather.humidity}%</div>
            </div>
            <div>
              <div className="weather-header">Wind Speed</div>
              <div className="weather-value">{currentWeather.windSpeed} m/s</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
} 