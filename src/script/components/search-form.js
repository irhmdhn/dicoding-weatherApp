class SearchForm extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }
  get inputValue() {
    return this.querySelector("#search-input").value;
  }
  render() {
    this.innerHTML = `
    <div id="search-container" class="flex gap-4 max-w-lg mb-8 mx-auto">
        <input 
            id="search-input" 
            type="text"
            class="w-full px-4 rounded-xl bg-gray-50/5 shadow-lg focus-visible:bg-gray-50/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-50/25 focus-visible:outline-offset-2"
            placeholder="Search city" 
            autofocus>
        <button
            id="search-btn"
            class="bg-gray-50/5 text-sky-50 w-12 h-12 rounded-xl shadow hover:bg-gray-50/10 focus-visible:bg-gray-50/10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-50/25 focus-visible:outline-offset-2 ">
            <i class="ph ph-magnifying-glass"></i>
        </button>
    </div>`;

    this.querySelector("#search-btn").addEventListener(
      "click",
      this._clickEvent
    );
    this.querySelector("#search-input").addEventListener(
      "keypress",
      function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.querySelector("#search-btn").click();
        }
      }
    );
  }
}
customElements.define("search-form", SearchForm);
