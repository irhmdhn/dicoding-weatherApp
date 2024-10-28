const baseApi = "https://api.openweathermap.org/data/2.5";
const keyApi = "22830e78356778ec40e3d21a9c0181d9";

export const getWeatherByCity = (city) => {
  return `${baseApi}/weather?q=${city}&units=metric&appid=${keyApi}`;
};

export const getWeatherByCoord = (lat, lon) => {
  return `${baseApi}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;
};

export const getIcon = (id) => {
  return `https://openweathermap.org/img/wn/${id}@2x.png`;
};

export const getForecastByCity = (city) => {
  return `${baseApi}/forecast?q=${city}&units=metric&appid=${keyApi}`;
};

export const getForecastByCoord = (lat, lon) => {
  return `${baseApi}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;
};
