import { useState, useEffect } from "react";
import { getWeather } from "../api";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import DetailStats from "../components/DetailStats";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import bgerror from "../assets/images/icon-error.svg";

export default function Home() {
  const [city, setCity] = useState("Berlin");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [units, setUnits] = useState({
    temp: "C",
    wind: "kph",
    precip: "mm",
  });

  const fetchWeather = (searchCity) => {
    setLoading(true);
    setError(false);
    getWeather(searchCity)
      .then((data) => {
        if (data) setWeather(data);
        else setError(true);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleRetry = () => fetchWeather(city);

  const getWindValue = (data) =>
    !data
      ? ""
      : units.wind === "kph"
      ? `${Math.round(data.current.wind_kph)} kph`
      : `${Math.round(data.current.wind_mph)} mph`;

  const getTempValue = (data, type) =>
    !data
      ? ""
      : type === "feels_like"
      ? units.temp === "C"
        ? `${Math.round(data.current.feelslike_c)}°`
        : `${Math.round(data.current.feelslike_f)}°`
      : units.temp === "C"
      ? `${Math.round(data.current.temp_c)}°`
      : `${Math.round(data.current.temp_f)}°`;

  const getPrecipValue = (data) =>
    !data
      ? ""
      : units.precip === "mm"
      ? `${data.current.precip_mm} mm`
      : `${data.current.precip_in} in`;

  if (error)
    return (
      <div className="min-h-screen w-full bg-[#0B1023] text-white flex flex-col">
        <Navbar units={units} setUnits={setUnits} />
        <div className="flex-1 flex flex-col items-center text-center mt-10">
          <img src={bgerror} alt="error" className="mb-4" />
          <h1 className="text-4xl font-bold mb-3">Something went wrong</h1>
          <p className="text-lg text-gray-400 mb-6 max-w-sm">
            We couldn't connect to the server (API error). Please try again in a
            few moments.
          </p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 bg-[#2E3349] hover:bg-[#3A4057] transition-colors duration-200 px-6 py-2 rounded-xl text-sm font-medium border border-gray-600"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (loading && !weather)
    return (
      <div className="min-h-screen w-full bg-[#0B1023] text-white flex flex-col">
        <Navbar units={units} setUnits={setUnits} />
        <div className="flex-1 flex items-center justify-center text-xl">
          Loading weather data...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-[#0B1023] text-white px-4 md:px-6 py-6">
      <Navbar units={units} setUnits={setUnits} />
      <h1 className="text-center text-3xl font-semibold">
        How’s the sky looking today?
      </h1>

      <div className="max-w-xl mx-auto mt-8">
        <SearchBar onSearch={setCity} />
      </div>

      <div className="mt-10 mx-auto max-w-7xl lg:px-24 xl:px-[100px] flex flex-col lg:flex-row gap-5 justify-center">
        <div className="w-full lg:w-[70%] flex flex-col gap-6">
          {weather ? (
            <>
              <CurrentWeatherCard city={city} unit={units.temp} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <DetailStats
                  label="Feels Like"
                  value={getTempValue(weather, "feels_like")}
                />
                <DetailStats label="Humidity" value={`${weather.current.humidity}%`} />
                <DetailStats label="Wind" value={getWindValue(weather)} />
                <DetailStats label="Precipitation" value={getPrecipValue(weather)} />
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Daily forecast</h2>
                <DailyForecast city={city} unit={units.temp} />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No weather data available for this city.
            </div>
          )}
        </div>

        <div className="w-full lg:w-[40%]">
          <HourlyForecast city={city} unit={units.temp} />
        </div>
      </div>
    </div>
  );
}
