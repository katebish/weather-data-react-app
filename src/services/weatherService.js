import axios from "axios";

const apiKey = '88da18fc837354cc3ccf6f69502f2d02';

/**
 * @typedef {object} City
 * @property {string} name
 * @property {number} lat
 * @property {number} lon
 */

/**
 * @typedef {object} WeatherData
 * @property {string} description
 * @property {number} temp
 * @property {number} feelsLike
 */

/**
 * A service to get the latitue, longitude and name of a city based on a specified city name
 * @param {string} cityName
 * @returns {City}
 */
export const getGeocodeForCity = async (cityName) => {
  try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`);
      const { lat, lon, name } = response.data[0];
      return { lat, lon, name };
    } catch (error) {
      console.error('Error fetching geocode for city:', error);
      throw error;
    }
};

/**
 * A service to get current weather data for a specified location
 * @param {number} lat 
 * @param {number} lon 
 * @returns {WeatherData}
 */
export const getCurrentWeatherDataForLocation = async (lat, lon) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const { main: { temp, feels_like }, weather } = response.data;
        const { description } = weather[0];
        return { description, temp, feelsLike: feels_like };
      } catch (error) {
        console.error('Error fetching weather data for location:', error);
        throw error;
      }
};
