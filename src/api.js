const API_KEY = "824dffb7d8fb4f0e9de132911251112";
export const getWeather = async (city) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    const data = await res.json();
    if (data.error) {
      console.error("Lỗi API:", data.error.message);
      return null;
    }
    return data; 
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
    return null;
  }
};
export const getForecast = async (city, days = 3) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
    );
    const data = await res.json();

    if (data.error) {
      console.error("Lỗi API forecast:", data.error.message);
      return null;
    }

    return data.forecast.forecastday; 
  } catch (error) {
    console.error("Lỗi khi lấy forecast:", error);
    return null;
  }
  
};
export const searchCity = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};