import { useEffect, useState } from "react";
import { getForecast } from "../api";

export default function DailyForecast({ city = "Berlin" }) {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getForecast(city, 7)
      .then((res) => {
        if (!res) return;
        const daily = res.map((d) => ({
          day: new Date(d.date).toLocaleDateString("en-US", { weekday: "short" }),
          max: `${Math.round(d.day.maxtemp_c)}°C`,
          min: `${Math.round(d.day.mintemp_c)}°C`,
          icon: `https:${d.day.condition.icon}`,
          condition: d.day.condition.text,
        }));
        setDays(daily);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
      {days.map((item, idx) => (
        <div
          key={idx}
          className="bg-[hsl(240,10%,15%)] p-3 md:p-4 rounded-xl text-center text-white"
        >
          <p className="font-[DM Sans] font-medium text-sm md:text-base">{item.day}</p>
          <div className="my-1">
            <img src={item.icon} alt={item.condition} className="mx-auto w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex justify-center items-baseline mt-2">
            <p className="text-[hsl(0,0%,60%)] text-base">
              {item.max}
            </p>
            <p className="text-[hsl(0,0%,60%)] text-sm ml-2">
              {item.min}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
