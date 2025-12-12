import { useEffect, useState } from "react";
import { getWeather } from "../api";
import bgCard from "../assets/images/bg-today-large.svg";
export default function CurrentWeatherCard({ city = "Berlin" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather(city)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Error loading data</p>;

  const temp = data.current.temp_c;
  const condition = data.current.condition.text;
  const icon = `https:${data.current.condition.icon}`;

  return (
    <div
     className="relative p-6 rounded-2xl w-full h-54 text-white flex items-center justify-between overflow-hidden"
      style={{
        backgroundImage: `url(${bgCard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 from-[rgba(30,38,103,0.6)] to-[rgba(62,77,163,0.6)] rounded-2xl"></div>

      <div className="relative flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg md:text-xl font-[DM Sans] font-semibold">
            {data.location.name}, {data.location.country}
          </h2>
          <p className="text-sm md:text-base text-[hsl(0,0%,90%)] mt-1">
            {new Date(data.location.localtime).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16">
            <img src={icon} alt={condition} className="w-full h-full" />
          </div>
          <p className="text-4xl md:text-5xl font-bold">{Math.round(temp)}°C</p>
        </div>
      </div>
    </div>
  );
}
