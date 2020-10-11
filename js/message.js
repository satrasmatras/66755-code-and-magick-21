'use strict';

(() => {
  const {isEscKey} = window.utils;

  const onError = (errorMessage) => {
    showError(errorMessage);
  };

  const showError = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);

    const timeoutId = setTimeout(function () {
      node.remove();
      document.removeEventListener(`keydown`, onEscPressed);
    }, 5000);

    const onEscPressed = (event) => {
      if (isEscKey(event)) {
        clearTimeout(timeoutId);
        node.remove();

        document.removeEventListener(`keydown`, onEscPressed);
      }
    };

    document.addEventListener(`keydown`, onEscPressed);
  };

  window.message = {
    showError,
    onError
  };
})();
