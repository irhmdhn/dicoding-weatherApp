import $ from "jquery";
const contentInfo = $("content-info")[0];

export const renderResult = (results) => {
  contentInfo.content = results;
};
export const fallbackResult = () => {
  contentInfo.renderError;
};
