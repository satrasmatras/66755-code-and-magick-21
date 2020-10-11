'use strict';

(() => {
  const HIDDEN_CLASS = `hidden`;

  const showElement = (element) => {
    element.classList.remove(HIDDEN_CLASS);
  };

  const hideElement = (element) => {
    element.classList.add(HIDDEN_CLASS);
  };

  window.domHelper = {
    showElement,
    hideElement
  };
})();
