import { useEffect, useState } from "react";
import { getForecast } from "../api";

export default function HourlyForecast({ city = "Berlin" }) {
  const [forecastData, setForecastData] = useState([]); 
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  useEffect(() => {
    getForecast(city, 7)
      .then((res) => {
        if (!res) return;

        const dailyForecasts = res.map((d) => ({
          date: d.date,
          dayName: new Date(d.date).toLocaleDateString("en-US", {
            weekday: "long",
          }),
          hours: d.hour.map((h) => ({
            time: new Date(h.time)
              .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
              .replace(":00 ", " "),
            temp: `${Math.round(h.temp_c)}°`,
            icon: `https:${h.condition.icon}`,
            condition: h.condition.text,
          })),
        }));

        setForecastData(dailyForecasts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [city]);

  if (loading) return <p>Loading...</p>;

  const selectedDayData = forecastData[selectedDayIndex];

  return (
    <div className="bg-[#1C1F2E] p-4 rounded-xl w-full h-fit text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Hourly forecast</h3>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-lg text-sm transition-colors duration-150 hover:bg-[rgba(255,255,255,0.2)]"
          >
            {selectedDayData ? selectedDayData.dayName : "Select Day"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[hsl(240,10%,15%)] border border-[hsl(240,10%,30%)] rounded-lg shadow-lg z-20">
              {forecastData.map((day, index) => (
                <button
                  key={day.date}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[hsl(240,10%,20%)] ${
                    selectedDayIndex === index ? "font-bold bg-[hsl(240,10%,20%)]" : ""
                  }`}
                  onClick={() => {
                    setSelectedDayIndex(index);
                    setDropdownOpen(false);
                  }}
                >
                  {index === 0 ? "Today" : day.dayName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {selectedDayData.hours.slice(0, 10).map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center w-full py-2 px-1 text-base font-medium ${
              idx < 9 ? "border-b border-[rgba(255,255,255,0.05)]" : ""
            }`}
          >
            <div className="flex items-center gap-4 w-1/3">
              <img src={item.icon} alt={item.condition} className="w-6 h-6" />
              <span className="text-sm md:text-base text-gray-300">{item.time}</span>
            </div>
            <span className="text-lg font-semibold w-1/3 text-right">{item.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
