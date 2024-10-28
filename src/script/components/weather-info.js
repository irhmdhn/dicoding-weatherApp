import moment from "moment";

class WeatherInfo extends HTMLElement {
  set weather(weather) {
    this._weather = weather;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="bg-gray-50/5 rounded-3xl p-9 mx-auto shadow-xl text-center flex flex-col gap-8 mb-6">
      <div class="text-2xl font-bold flex justify-center items-center gap-2">
        <i class="ph ph-map-pin text-gray-500"></i> 
        <h2 class="">
          ${this._weather.name}, ${this._weather.sys.country}
        </h2>
      </div>
      
      <div class="flex flex-col gap-2">
        <h1 class="text-7xl font-light" title="Temp">
          ${Math.round(this._weather.main.temp)}&deg;
        </h1>
        <h4 class="text-lg text-gray-500" title="Weather, Min/max temp">
          ${this._weather.weather[0].main} 
          ${Math.round(this._weather.main.temp_min)}&deg;/
          ${Math.round(this._weather.main.temp_max)}&deg;
        </h4>
      </div>

      <div class="grid grid-cols-1 text-md text-center">
        <div class="w-fit grid grid-cols-5 gap-3 mx-auto">
          
          <h6 class="text-gray-500 text-end col-span-2">Humidity</h6>
          <i class="ph ph-drop col-span-1 flex items-center justify-center text-sky-500"></i>
          <p class="font-bold text-start col-span-2">${
            this._weather.main.humidity
          }%</p>
          
          <h6 class="text-gray-500 text-end col-span-2">Pressure</h6>
          <i class="ph ph-gauge col-span-1 flex items-center justify-center text-red-500"></i>
          <p class="font-bold text-start col-span-2">${
            this._weather.main.pressure
          } hPa</p>

          <h6 class="text-gray-500 text-end col-span-2">Wind</h6>
          <i class="ph ph-wind col-span-1 flex items-center justify-center"></i>
          <p class="font-bold text-start col-span-2">${
            this._weather.wind.speed
          } m/s</p>
        </div>
      </div>
    </div>
    <div class="bg-gray-50/5 rounded-3xl p-9 mx-auto shadow-xl text-center flex justify-evenly gap-8">
        <div class="flex flex-col items-center gap-2">
            <i class="ph ph-sun-horizon text-2xl text-yellow-500"></i>
            <h3 class="text-lg">${moment
              .unix(this._weather.sys.sunrise)
              .format("LT")}</h3>
            <p class="text-gray-500">Sunrise</p>
        </div>
        <div class="flex flex-col items-center gap-2">    
          <i class="ph ph-sun-horizon text-2xl text-orange-500"></i>
            <h3 class="text-lg">${moment
              .unix(this._weather.sys.sunset)
              .format("LT")}</h3>
            <p class="text-gray-500">Sunset</p>
        </div>
    </div>
    `;
  }
}
customElements.define("weather-info", WeatherInfo);
