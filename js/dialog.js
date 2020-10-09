'use strict';

(() => {
  const {showElement, hideElement} = window.domHelper;
  const {isEscKey, isMainClick, isEnterKey} = window.utils;
  const {setupElement, setupNameInputElement} = window.elements;
  const {addSetupListeners, removeSetupListeners} = window.setup;
  const {showSimilarWizardsList, clearSimilarWizardsList} = window.similarWizards;
  const {save} = window.backend;
  const {showError} = window.message;

  const setupOpenElement = document.querySelector(`.setup-open`);
  const setupCloseElement = setupElement.querySelector(`.setup-close`);
  const setupForm = setupElement.querySelector(`.setup-wizard-form`);

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

  const onLoad = () => {
    closeSetup();
  };

  const onError = (errorMessage) => {
    showError(errorMessage);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (setupForm.reportValidity()) {
      const data = new FormData(setupForm);
      save(data, onLoad, onError);
    }
  };

  setupForm.addEventListener(`submit`, onSubmit);

  const initialDialogCoords = getDialogInitialPosition();
})();
