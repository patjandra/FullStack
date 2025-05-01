import { useEffect, useRef } from "react";
import { useWeather } from "../context/WeatherContext";

export default function Saved() {
  const { savedCities, updateSavedCities, deleteCity } = useWeather();
  const intervalRef = useRef(null);

  // Initial update when component mounts
  useEffect(() => {
    updateSavedCities();
  }, []);

  // Set up interval for updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateSavedCities();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [updateSavedCities]);

  const handleDelete = (cityToDelete) => {
    deleteCity(cityToDelete);
  };

  return (
    <div className="glass-card saved-table-card">
      <table className="saved-table">
        <thead>
          <tr>
            <th className="saved-th">Location</th>
            <th className="saved-th">Temperature</th>
            <th className="saved-th">Condition</th>
            <th className="saved-th">Humidity</th>
            <th className="saved-th">Wind Speed</th>
            <th className="saved-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedCities.map((city, index) => (
            <tr key={index}>
              <td className="saved-td">{city.city}</td>
              <td className="saved-td">{city.temperature}°F</td>
              <td className="saved-td">{city.condition}</td>
              <td className="saved-td">{city.humidity}%</td>
              <td className="saved-td">{city.windSpeed} m/s</td>
              <td className="saved-td">
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(city.city)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {savedCities.length === 0 && (
            <tr>
              <td colSpan="6" className="saved-td" style={{ textAlign: 'center' }}>
                No cities saved yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 