import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Wether = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Get coordinates for the city
      const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      if (geoResponse.data.results && geoResponse.data.results.length > 0) {
        const { latitude, longitude, name } = geoResponse.data.results[0];

        // Get weather data for the coordinates
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        setWeatherData({ ...weatherResponse.data.current_weather, city: name });
      } else {
        throw new Error('City not found');
      }
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Weather App</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            className="border-gray-300 border rounded p-4 w-full text-xl focus:outline-none"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 mt-4 w-full rounded transition duration-300"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold">{weatherData.city}</h2>
            <p className="text-lg">Temperature: {weatherData.temperature}°C</p>
            <p className="text-lg">Weather: {weatherData.weathercode}</p>
            <p className="text-lg">Wind Speed: {weatherData.windspeed} km/h</p>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t text-center">
        <Link
          to="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Wether;
