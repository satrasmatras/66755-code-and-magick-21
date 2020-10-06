'use strict';

(function () {
  const {getNextItemFromArray} = window.random;
  const {EYE_COLORS, COAT_COLORS, FIREBALL_COLORS} = window.wizardData;
  const {setupElement} = window.elements;

  const setupPlayerElement = setupElement.querySelector(`.setup-player`);

  const setupWizardEyesElement = setupPlayerElement.querySelector(`.wizard-eyes`);
  const setupWizardEyesInputElement = setupPlayerElement.querySelector(`#eyes-color`);

  const setupWizardCoatElement = setupPlayerElement.querySelector(`.wizard-coat`);
  const setupWizardCoatInputElement = setupPlayerElement.querySelector(`#coat-color`);

  const setupFireballWrapElement = setupPlayerElement.querySelector(`.setup-fireball-wrap`);
  const setupFireballInputElement = setupPlayerElement.querySelector(`#fireball-color`);

  const setWizardPartColor = (element, elementStyleProperty, input, variants) => {
    const currentColor = input.value;
    const nextColor = getNextItemFromArray(currentColor, variants);

    element.style[elementStyleProperty] = nextColor;
    input.value = nextColor;
  };

  const onWizardEyesClick = () => {
    setWizardPartColor(setupWizardEyesElement, `fill`, setupWizardEyesInputElement, EYE_COLORS);
  };

  const onWizardCoatClick = () => {
    setWizardPartColor(setupWizardCoatElement, `fill`, setupWizardCoatInputElement, COAT_COLORS);
  };

  const onFireballClick = () => {
    setWizardPartColor(setupFireballWrapElement, `background-color`, setupFireballInputElement, FIREBALL_COLORS);
  };

  const addSetupListeners = () => {
    setupWizardEyesElement.addEventListener(`click`, onWizardEyesClick);
    setupWizardCoatElement.addEventListener(`click`, onWizardCoatClick);
    setupFireballWrapElement.addEventListener(`click`, onFireballClick);
  };

  const removeSetupListeners = () => {
    setupWizardEyesElement.removeEventListener(`click`, onWizardEyesClick);
    setupWizardCoatElement.removeEventListener(`click`, onWizardCoatClick);
    setupFireballWrapElement.removeEventListener(`click`, onFireballClick);
  };

  window.setup = {
    addSetupListeners,
    removeSetupListeners
  };
})();
