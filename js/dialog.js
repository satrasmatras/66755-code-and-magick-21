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
  const setupFormElement = setupElement.querySelector(`.setup-wizard-form`);

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

  const openSetup = () => {
    showSimilarWizardsList();
    setDialogToInitialPosition();
    showElement(setupElement);
    addDialogListeners();
    addSetupListeners();
    removeSetupOpenListeners();
  };

  const closeSetup = () => {
    hideElement(setupElement);
    setDialogToInitialPosition();
    clearSimilarWizardsList();
    removeDialogListeners();
    removeSetupListeners();
    addSetupOpenListeners();
  };

  const onSetupOpenClick = (event) => {
    if (isMainClick(event)) {
      openSetup();
    }
  };

  const onSetupOpenEnterPressed = (event) => {
    if (isEnterKey(event)) {
      openSetup();
    }
  };

  const addSetupOpenListeners = () => {
    setupOpenElement.addEventListener(`click`, onSetupOpenClick);
    setupOpenElement.addEventListener(`keydown`, onSetupOpenEnterPressed);
  };

  const removeSetupOpenListeners = () => {
    setupOpenElement.removeEventListener(`click`, onSetupOpenClick);
    setupOpenElement.removeEventListener(`keydown`, onSetupOpenEnterPressed);
  };

  const onLoad = () => {
    closeSetup();
  };

  const onError = (errorMessage) => {
    showError(errorMessage);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (setupFormElement.reportValidity()) {
      const data = new FormData(setupFormElement);
      save(data, onLoad, onError);
    }
  };

  addSetupOpenListeners();

  setupFormElement.addEventListener(`submit`, onSubmit);

  const initialDialogCoords = getDialogInitialPosition();
})();
