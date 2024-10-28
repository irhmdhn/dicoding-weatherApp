import { getIcon } from "../utilities/services";
import moment from "moment";

class ForecastInfo extends HTMLElement {
  set forecast(forecast) {
    this._forecast = forecast;
    this.render();
  }

  render() {
    const data = this._forecast.list;
    const forecast5Days = [];
    const getFirstDate = moment(data[0]).format("HH");
    for (const num of data) {
      if (moment(num.dt_txt).format("HH") == getFirstDate) {
        forecast5Days.push(num);
      }
    }

    this.innerHTML = `
    <div class="w-full bg-gray-50/5 rounded-3xl p-9 shadow-xl mb-6">
        <h3 class="text-lg font-bold text-gray-500 mb-2 w-fit">24 hours forecast</h3>
        <div class="w-full grid grid-flow-col overflow-x-scroll py-3 gap-6">
            ${data
              .slice(31)
              .map((weather) => {
                return `
                <div class="flex flex-col gap-2 w-20 text-center">
                  <h5 class="text-2xl font-bold">${Math.round(
                    weather.main.temp
                  )}&deg;</h5>
                  <img src=${getIcon(
                    weather.weather[0].icon
                  )} class="w-12 mx-auto">
                  <div>
                    <p class="text-sm text-light">${weather.weather[0].main}</p>
                    <span class="text-sm text-gray-500">${moment(
                      weather.dt_txt
                    ).format("LT")}</span>
                  </div>
                </div>
                `;
              })
              .join("")}
        </div>
    </div>
    <div class="w-full bg-gray-50/5 rounded-3xl p-9 shadow-xl">
        <h3 class="text-lg font-bold text-gray-500 mb-2 w-fit">5 days forecast</h3>
        <div class="w-full grid grid-flow-col overflow-x-scroll py-3 gap-6">
            ${forecast5Days
              .map((weather) => {
                return `
                <div class="flex flex-col gap-2 w-20 text-center">
                  <h5 class="text-2xl font-bold">${Math.round(
                    weather.main.temp
                  )}&deg;</h5>
                  <img src=${getIcon(
                    weather.weather[0].icon
                  )} class="w-12 mx-auto">
                  <div>
                    <p class="text-sm text-light">${weather.weather[0].main}</p>
                    <span class="text-sm text-gray-500">${moment(
                      weather.dt_txt
                    ).format("M/D")}</span>
                  </div>
                </div>
                `;
              })
              .join("")}
        </div>
    </div>
    `;
  }
}
customElements.define("forecast-info", ForecastInfo);
