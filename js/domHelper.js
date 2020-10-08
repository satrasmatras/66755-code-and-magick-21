'use strict';

(() => {
  const showElement = (element) => {
    element.classList.remove(`hidden`);
  };

  const hideElement = (element) => {
    element.classList.add(`hidden`);
  };

  window.domHelper = {
    showElement,
    hideElement
  };
})();
