'use strict';

(() => {
  const {showElement, hideElement} = window.domHelper;
  const {isEscKey, isMainClick, isEnterKey} = window.utils;
  const {setupElement, setupNameInputElement} = window.elements;
  const {addSetupListeners, removeSetupListeners} = window.playerWizard;
  const {showSimilarWizardsList, clearSimilarWizardsList} = window.similarWizards;

  const setupOpenElement = document.querySelector(`.setup-open`);
  const setupCloseElement = setupElement.querySelector(`.setup-close`);

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

  const onSetupCloseClick = (event) => {
    if (isMainClick(event)) {
      closeSetup();
    }
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
    removeOpenSetupListeners();
  };

  const closeSetup = () => {
    hideElement(setupElement);
    setDialogToInitialPosition();
    clearSimilarWizardsList();
    removeDialogListeners();
    removeSetupListeners();
    addOpenSetupListeners();
  };

  const onSetupOpenElementClick = (event) => {
    if (isMainClick(event)) {
      openSetup();
    }
  };

  const onSetupOpenEnterPressed = (event) => {
    if (isEnterKey(event)) {
      openSetup();
    }
  };

  const addOpenSetupListeners = () => {
    setupOpenElement.addEventListener(`click`, onSetupOpenElementClick);
    setupOpenElement.addEventListener(`keydown`, onSetupOpenEnterPressed);
  };

  const removeOpenSetupListeners = () => {
    setupOpenElement.removeEventListener(`click`, onSetupOpenElementClick);
    setupOpenElement.removeEventListener(`keydown`, onSetupOpenEnterPressed);
  };

  const initialDialogCoords = getDialogInitialPosition();
})();
