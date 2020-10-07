'use strict';

(function () {
  const {showElement, hideElement} = window.domHelper;
  const {isEscKey, isMainClick, isEnterKey} = window.utils;
  const {setupElement, setupNameInputElement} = window.elements;
  const {addSetupListeners, removeSetupListeners} = window.setup;
  const {showSimilarWizardsList, clearSimilarWizardsList} = window.similarWizards;

  const setupOpenElement = document.querySelector(`.setup-open`);
  const setupCloseElement = setupElement.querySelector(`.setup-close`);

  const onSetupCloseClick = () => {
    closeSetup();
  };

  const getDialogInitialPosition = () => {
    const {left, top} = getComputedStyle(setupElement);
    return {
      left,
      top
    };
  };

  const setDialogToInitialPosition = () => {
    setupElement.style.top = initialDialogCoords.top;
    setupElement.style.left = initialDialogCoords.left;
  };

  const onSetupCloseEnterPressed = (event) => {
    if (isEnterKey(event)) {
      closeSetup();
    }
  };

  const setupHasFocus = () => document.activeElement === setupNameInputElement;

  const onSetupEscPressed = (event) => {
    if (isEscKey(event) && !setupHasFocus()) {
      closeSetup();
    }
  };

  const addDialogListeners = () => {
    setupCloseElement.addEventListener(`click`, onSetupCloseClick);
    setupCloseElement.addEventListener(`keydown`, onSetupCloseEnterPressed);
    document.addEventListener(`keydown`, onSetupEscPressed);
  };

  const removeDialogListeners = () => {
    setupCloseElement.removeEventListener(`click`, onSetupCloseClick);
    setupCloseElement.removeEventListener(`keydown`, onSetupCloseEnterPressed);
    document.removeEventListener(`keydown`, onSetupEscPressed);
  };

  let isOpened = false;

  const openSetup = () => {
    showSimilarWizardsList();
    setDialogToInitialPosition();
    showElement(setupElement);
    addDialogListeners();
    addSetupListeners();
    isOpened = true;
  };

  const closeSetup = () => {
    hideElement(setupElement);
    setDialogToInitialPosition();
    clearSimilarWizardsList();
    removeDialogListeners();
    removeSetupListeners();
    isOpened = false;
  };

  setupOpenElement.addEventListener(`click`, (event) => {
    if (isMainClick(event) && !isOpened) {
      openSetup();
    }
  });

  setupOpenElement.addEventListener(`keydown`, (event) => {
    if (isEnterKey(event) && !isOpened) {
      openSetup();
    }
  });

  const initialDialogCoords = getDialogInitialPosition();
})();
