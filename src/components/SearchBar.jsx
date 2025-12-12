import { useState, useEffect } from "react";
import { searchCity } from "../api";
import SearchIcon from '../assets/images/icon-search.svg';
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (!query.trim()) return setSuggestions([]);
    const timer = setTimeout(() => {
      searchCity(query).then((data) => setSuggestions(data || []));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  const handleSelect = (cityName) => {
    setQuery(cityName);
    setSuggestions([]);
    onSearch(cityName);
  };
  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
    }
  };
  return (
    <div className="relative max-w-xl">
      <div className="flex items-center bg-[hsl(240,10%,15%)] p-2 rounded-xl gap-2">
        <div className="cursor-pointer " onClick={handleSearch} >
            <img 
                src={SearchIcon} alt="Search Icon" 
                className="w-3 h-5 md:w-6 md:h-6 opacity-70" 
            />
            </div>
            <input
                type="text"
                placeholder="Search for a place..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-[hsl(0,0%,70%)] text-base md:text-lg ml-2" // Thêm margin trái cho input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-[hsl(200,100%,50%)] rounded-lg text-white font-semibold hover:bg-[hsl(200,90%,45%)] focus:outline-none focus:ring-2 focus:ring-[hsl(200,100%,60%)]"
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-[hsl(240,10%,15%)] ">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-[hsl(240,10%,25%)]"
              onClick={() => handleSelect(item.name)}
            >
              {item.name}, {item.region ? item.region + ", " : ""}{item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
