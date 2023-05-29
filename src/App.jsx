import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import WeatherComponent from './components/WeatherComponent';

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState('https://source.unsplash.com/1600x900/?Ecuador');
  
  const [city, setCity] = useState('');

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEY = "8e82743193f2e251b8887c8b9d7c240a";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    axios.get(url)
      .then(({ data }) => {
        setWeatherInfo(data);
        if (data) {
          setImageUrl(`https://source.unsplash.com/1600x900/?${data.name}`);
        } else {
          alert("No se pudo encontrar la ciudad");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const API_KEY = "8e82743193f2e251b8887c8b9d7c240a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    axios.get(url)
      .then(({ data }) => {
        setWeatherInfo(data);
        if (data) {
          setImageUrl(`https://source.unsplash.com/1600x900/?${data.name}`);
        } else {
          alert("No se pudo encontrar la ciudad");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div
      className="relative flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form onSubmit={handleSubmit} className="my-4">
        <label htmlFor='city' className='sr-only'>City</label>
        <input
          type='text'
          id='city'
          placeholder='Ingrese la ciudad'
          value={city}
          onChange={handleCityChange}
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
        >
          Search
        </button>
      </form> 
      <section className="p-4 text-black flex justify-center items-center font-principal">
        <WeatherComponent weatherInfo={weatherInfo} />
      </section>
    </div>
  );
}

export default App;
