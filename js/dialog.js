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
    showElement(setupElement);
    addDialogListeners();
    addSetupListeners();
  };

  const closeSetup = () => {
    hideElement(setupElement);
    clearSimilarWizardsList();
    removeDialogListeners();
    removeSetupListeners();
  };

  setupOpenElement.addEventListener(`click`, (event) => {
    if (isMainClick(event)) {
      openSetup();
    }
  });

  setupOpenElement.addEventListener(`keydown`, (event) => {
    if (isEnterKey(event)) {
      openSetup();
    }
  });
})();
