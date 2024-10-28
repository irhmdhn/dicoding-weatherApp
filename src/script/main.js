import $ from "jquery";
import moment from "moment";
import favicon from "./../asset/favicon.ico";
import { getWeatherByCity, getForecastByCity } from "./utilities/services.js";
import { renderResult, fallbackResult } from "./utilities/responseResult.js";
import { getUserLocation } from "./utilities/getUserLocation.js";
import { isLoading, loadingDone } from "./utilities/loading.js";
import "./components/search-form.js";
import "./components/content-info.js";

const main = () => {
  // Default view
  $("head").append(
    `<link rel="shortcut icon" href=${favicon} type="image/x-icon">`
  );
  setInterval(() => {
    $(".date").text(moment().format("ll") + " " + moment().format("LT"));
  }, 1000);
  //

  const searchForm = $("search-form")[0];

  getUserLocation();

  const btnSearchClick = () => {
    isLoading();
    const weather = fetch(getWeatherByCity(searchForm.inputValue)).then(
      (response) => response.json()
    );
    const forecast = fetch(getForecastByCity(searchForm.inputValue)).then(
      (response) => response.json()
    );
    Promise.all([weather, forecast])
      .then(([dataWeather, dataForecast]) => {
        renderResult([dataWeather, dataForecast]);
        loadingDone();
      })
      .catch(() => {
        fallbackResult();
        loadingDone();
      });
  };
  searchForm.clickEvent = btnSearchClick;
};
export default main;
