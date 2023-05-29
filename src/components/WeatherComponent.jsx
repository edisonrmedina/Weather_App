import React, { useState } from 'react';

function WeatherComponent({ weatherInfo }) {
  const [isCelsius, setIsCelsius] = useState(false);

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const convertToKelvin = (celsius) => {
    return celsius + 273.15;
  };

  const changeMetrics = () => {
    setIsCelsius(!isCelsius);
  };

  const temperature = isCelsius
    ? convertToCelsius(weatherInfo?.main.temp).toFixed(2)
    : weatherInfo?.main.temp;

  const temperatureUnit = isCelsius ? '°C' : '°K';

  const urlIcon = `https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`;

  return (
    <section className='text-center grid gap-6'>
      <h2 className='text-3xl font-bold bg-white bg-opacity-70'>
        {weatherInfo?.name}, {weatherInfo?.sys.country}
      </h2>

      <section className='grid gap-4 sm:grid-cols-2'>
        <article className='p-2 rounded-2xl grid grid-cols-2 items-center justify-items-center bg-white bg-opacity-70'>
          <h3 className='col-span-2 capitalize'>{weatherInfo?.weather[0].description}</h3>
          <span className='text-2xl'>
            {temperature}
            {temperatureUnit}
          </span>
          <div className='text-left'>
            <img src={urlIcon} alt='' />
          </div>
        </article>

        <article className='p-2 py-6 rounded-2xl grid grid-cols-3 sm:grid-cols-1 bg-white bg-opacity-70'>
          <div className='flex gap-4'>
            <img src='/image/aire.svg' alt='' />
            <span>{weatherInfo?.wind.speed} m/s</span>
          </div>

          <div className='flex gap-2'>
            <img src='/image/lluvia.svg' alt='' />
            <div className='flex items-center justify-end'>
              <span>{weatherInfo?.main.humidity} %</span>
            </div>
          </div>

          <div className='flex gap-2'>
            <img src='/image/flecha.svg' alt='' />
            <span>{weatherInfo?.main.pressure} hPa</span>
          </div>
        </article>
      </section>

      <button onClick={changeMetrics} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto'>
        Change {isCelsius ? 'K' : 'C'} °
      </button>
    </section>
  );
}

export default WeatherComponent;
