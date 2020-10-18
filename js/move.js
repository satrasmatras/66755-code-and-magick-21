'use strict';

(() => {
  const {setupElement} = window.elements;
  const dialogHandleElement = setupElement.querySelector(`.upload`);

  let startCoords;
  let dragged;

  const onMouseDown = (event) => {
    event.preventDefault();

    startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    dragged = false;

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const onMouseMove = function (event) {
    event.preventDefault();

    dragged = true;

    const shift = {
      x: startCoords.x - event.clientX,
      y: startCoords.y - event.clientY
    };

    startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    setupElement.style.top = (setupElement.offsetTop - shift.y) + `px`;
    setupElement.style.left = (setupElement.offsetLeft - shift.x) + `px`;
  };

  const onMouseUp = (event) => {
    event.preventDefault();

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        dialogHandleElement.removeEventListener(`click`, onClickPreventDefault);
      };
      dialogHandleElement.addEventListener(`click`, onClickPreventDefault);
    }

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  dialogHandleElement.addEventListener(`mousedown`, onMouseDown);
})();
