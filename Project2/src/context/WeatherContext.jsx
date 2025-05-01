import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [savedCities, setSavedCities] = useState(() => {
    const saved = localStorage.getItem('savedCities');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (savedCities.length > 0) {
      localStorage.setItem('savedCities', JSON.stringify(savedCities));
    } else {
      localStorage.removeItem('savedCities');
    }
  }, [savedCities]);

  const fetchWeather = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=imperial`
      );
      
      const weatherData = {
        city: response.data.name,
        temperature: Math.round(response.data.main.temp),
        condition: response.data.weather[0].main,
        humidity: response.data.main.humidity,
        windSpeed: Math.round(response.data.wind.speed),
      };
      
      setCurrentWeather(weatherData);
      return weatherData;
    } catch (err) {
      setError('City not found. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCity = useCallback(async (city) => {
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      setSavedCities(prev => {
        if (prev.some(c => c.city === weatherData.city)) {
          return prev.map(c => c.city === weatherData.city ? weatherData : c);
        }
        return [...prev, weatherData];
      });
    }
  }, [fetchWeather]);

  const deleteCity = useCallback((cityToDelete) => {
    const currentSaved = JSON.parse(localStorage.getItem('savedCities') || '[]');
    const updatedSaved = currentSaved.filter(city => city.city !== cityToDelete);
    localStorage.setItem('savedCities', JSON.stringify(updatedSaved));
    
    setSavedCities(updatedSaved);
  }, []);

  const updateSavedCities = useCallback(async () => {
    if (savedCities.length === 0) return;
    
    try {
      const updatedCities = await Promise.all(
        savedCities.map(async (city) => {
          try {
            const weather = await fetchWeather(city.city);
            return weather || city;
          } catch (error) {
            console.error(`Error updating weather for ${city.city}:`, error);
            return city;
          }
        })
      );
      
      const validCities = updatedCities.filter(city => city !== null);
      if (validCities.length > 0) {
        setSavedCities(validCities);
      }
    } catch (error) {
      console.error('Error updating cities:', error);
    }
  }, [savedCities, fetchWeather]);

  return (
    <WeatherContext.Provider value={{
      savedCities,
      currentWeather,
      loading,
      error,
      fetchWeather,
      saveCity,
      deleteCity,
      updateSavedCities
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
} 