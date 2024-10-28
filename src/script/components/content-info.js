import "./weather-info.js";
import "./forecast-info.js";

class ContentInfo extends HTMLElement {
  set content(content) {
    this._content = content;
    if (content[0].message) {
      this.renderError();
    } else {
      this.render();
    }
  }

  render() {
    this.innerHTML = "";

    const weatherElement = document.createElement("weather-info");
    weatherElement.weather = this._content[0];
    weatherElement.classList.add("md:col-span-2", "lg:col-span-2");
    this.appendChild(weatherElement);

    const forecastElement = document.createElement("forecast-info");
    forecastElement.classList.add("md:col-span-3", "lg:col-span-4");
    forecastElement.forecast = this._content[1];
    this.appendChild(forecastElement);
  }

  renderError() {
    this.innerHTML = "";
    this.innerHTML += `<i class="ph ph-cloud-x text-6xl text-center w-full col-span-6 text-red-500"></i><h3 class="err text-lg text-center w-full col-span-6">${this._content[0].message}.</h3>`;
  }
}
customElements.define("content-info", ContentInfo);
