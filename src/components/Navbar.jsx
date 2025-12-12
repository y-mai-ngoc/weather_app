import { useState } from "react";
import Logo from '../assets/images/logo.svg';
const UNIT_OPTIONS = {
    temperature: [
        { label: "Celsius (°C)", value: "C", key: "C" },
        { label: "Fahrenheit (°F)", value: "F", key: "F" },
    ],
    windSpeed: [
        { label: "km/h", value: "kph", key: "kph" },
        { label: "mph", value: "mph", key: "mph" },
    ],
    precipitation: [
        { label: "Millimeters (mm)", value: "mm", key: "mm" },
        { label: "Inches (in)", value: "in", key: "in" },
    ],
};
export default function Navbar({ units, setUnits }) {
    const [open, setOpen] = useState(false);

    const handleTemperatureChange = (newUnit) => {
        setUnits(prevUnits => ({ 
            ...prevUnits, 
            temp: newUnit 
        }));
        setOpen(false);
    };
    const handleWindChange = (newUnit) => {
        setUnits(prevUnits => ({
            ...prevUnits,
            wind: newUnit,
        }));
    };
    const handlePrecipChange = (newUnit) => {
        setUnits(prevUnits => ({
            ...prevUnits,
            precip: newUnit,
        }));
    };
    const handleSwitchSystem = (system) => {
        if (system === 'Imperial') {
            setUnits({ temp: 'F', wind: 'mph', precip: 'in' });
        } else {
            setUnits({ temp: 'C', wind: 'kph', precip: 'mm' });
        }
        setOpen(false);
    };
    const renderCheckmark = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500" 
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 13.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );

    const isImperial = units.temp === 'F';

    return (
        <nav className="relative bg-[hsl(240,10%,10%)] text-white">
            <div className="flex justify-between items-center py-4 mx-auto max-w-7xl lg:px-24 xl:px-[100px]">
                <a href="/" className="cursor-pointer"> 
                    <img src={Logo} alt="Weather Now Logo" />
                </a>
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 border border-[hsl(240,10%,40%)] px-4 py-1 rounded-xl bg-[hsl(240,10%,15%)] text-sm md:text-base hover:bg-[hsl(240,10%,20%)] focus:outline-none focus:ring-2 focus:ring-[hsl(200,100%,50%)] transition-all duration-200"
                    >
                        ⚙ Units 
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 w-72 bg-[#1C1F2E] border border-[hsl(240,10%,30%)] rounded-xl shadow-2xl text-white z-20">
                            <button
                                className="w-full text-left py-2 px-4 font-semibold text-base hover:bg-[hsl(240,10%,20%)] transition-colors duration-150 border-b border-[hsl(240,10%,30%)] rounded-t-xl"
                                onClick={() => handleSwitchSystem(isImperial ? 'Metric' : 'Imperial')}
                            >
                                {isImperial ? 'Switch to Metric' : 'Switch to Imperial'}
                            </button>
                            <div className="py-2 px-4">
                                <p className="text-xs text-[hsl(240,10%,60%)] mb-1">Temperature</p>
                                <div className="flex flex-col space-y-1">
                                    {UNIT_OPTIONS.temperature.map((item) => (
                                        <button
                                            key={item.value}
                                            className="flex justify-between items-center w-full text-left text-sm hover:bg-[hsl(240,10%,20%)] px-2 py-1 rounded transition-colors duration-150"
                                            onClick={() => handleTemperatureChange(item.value)}
                                        >
                                            <span className={units.temp === item.value ? 'font-bold' : ''}>
                                                {item.label}
                                            </span>
                                            {units.temp === item.value && renderCheckmark()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-t border-[hsl(240,10%,30%)] my-1 mx-4" />
                            <div className="py-2 px-4">
                                <p className="text-xs text-[hsl(240,10%,60%)] mb-1">Wind Speed</p>
                                <div className="flex flex-col space-y-1">
                                    {UNIT_OPTIONS.windSpeed.map((item) => (
                                        <button
                                            key={item.value}
                                            className="flex justify-between items-center w-full text-left text-sm hover:bg-[hsl(240,10%,20%)] px-2 py-1 rounded transition-colors duration-150"
                                            onClick={() => handleWindChange(item.value)}
                                        >
                                            <span className={units.wind === item.value ? 'font-bold' : ''}>
                                                {item.label}
                                            </span>
                                            {units.wind === item.value && renderCheckmark()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-t border-[hsl(240,10%,30%)] my-1 mx-4" />
                            <div className="py-2 px-4 pb-4">
                                <p className="text-xs text-[hsl(240,10%,60%)] mb-1">Precipitation</p>
                                <div className="flex flex-col space-y-1">
                                    {UNIT_OPTIONS.precipitation.map((item) => (
                                        <button
                                            key={item.value}
                                            className="flex justify-between items-center w-full text-left text-sm hover:bg-[hsl(240,10%,20%)] px-2 py-1 rounded transition-colors duration-150"
                                            onClick={() => handlePrecipChange(item.value)}
                                        >
                                            <span className={units.precip === item.value ? 'font-bold' : ''}>
                                                {item.label}
                                            </span>
                                            {units.precip === item.value && renderCheckmark()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}