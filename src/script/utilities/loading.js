import $ from "jquery";
const contentInfo = $("content-info");
const loadingElement = `<div class="loader w-12 h-12 border-8 border-gray-500 rounded-full border-t-transparent animate-spin mx-auto col-span-6"></div>`;

export const isLoading = () => {
  contentInfo.children().remove();
  contentInfo.append(loadingElement);
};
export const loadingDone = () => {
  $(".loader").remove();
};
