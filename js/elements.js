'use strict';

(() => {
  const setupElement = document.querySelector(`.setup`);
  const setupNameInputElement = setupElement.querySelector(`#username`);

  window.elements = {
    setupElement,
    setupNameInputElement
  };
})();
