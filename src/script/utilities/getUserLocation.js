import $ from "jquery";
import {
  getWeatherByCoord,
  getForecastByCoord,
} from "../utilities/services.js";
import { renderResult, fallbackResult } from "./responseResult.js";
import { isLoading, loadingDone } from "./loading.js";

export const getUserLocation = () => {
  const loadingLocation = () => {
    isLoading();
    errorText("Getting location..");
  };

  const loadingLocationDone = () => {
    loadingDone();
    $("content-info .err").first().remove();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      loadingLocation();
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    renderhWeather(position.coords.latitude, position.coords.longitude);
  };

  const renderhWeather = async (lat, lon) => {
    const weather = fetch(getWeatherByCoord(lat, lon)).then((response) =>
      response.json()
    );
    const forecast = fetch(getForecastByCoord(lat, lon)).then((response) =>
      response.json()
    );
    Promise.all([weather, forecast])
      .then(([dataWeather, dataForecast]) => {
        renderResult([dataWeather, dataForecast]);
        loadingLocationDone();
      })
      .catch((message) => {
        console.log(message);
        fallbackResult(message);
        loadingLocationDone();
      });
  };

  const errorText = (text) => {
    $("content-info").append(
      `<h3 class="err text-lg text-center w-full col-span-6">
        ${text}.
      </h3>`
    );
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorText("User denied the request for Geolocation");
        loadingLocationDone();
        break;
      case error.POSITION_UNAVAILABLE:
        errorText("Location information is unavailable");
        loadingLocationDone();
        break;
      case error.TIMEOUT:
        errorText("The request to get user location timed out");
        loadingLocationDone();
        break;
      case error.UNKNOWN_ERROR:
        errorText("An unknown error occurred");
        loadingLocationDone();
        break;
    }
  };
  return getLocation();
};
