'use strict';

const NAMES = [
  `Иван`,
  `Хуан Себастьян`,
  `Мария`,
  `Кристоф`,
  `Виктор`,
  `Юлия`,
  `Люпита`,
  `Вашингтон`
];

const SURNAMES = [
  `да Марья`,
  `Верон`,
  `Мирабелла`,
  `Вальц`,
  `Онопко`,
  `Топольницкая`,
  `Нионго`,
  `Ирвинг`
];

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];

const EYE_COLORS = [
  `black`,
  `red`,
  `blue`,
  `yellow`,
  `green`
];

const FIREBALL_COLORS = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`
];

const SIMILAR_WIZARDS_COUNT = 4;

const getRandomNumberInRange = (max) => {
  return Math.round(Math.random() * max);
};

const getRandomItemFromArray = (array) => {
  return array[getRandomNumberInRange(array.length - 1)];
};

const getWizardName = () => {
  const randomName = getRandomItemFromArray(NAMES);
  const randomSurname = getRandomItemFromArray(SURNAMES);
  return `${randomName} ${randomSurname}`;
};

const getWizardCoatColor = () => getRandomItemFromArray(COAT_COLORS);

const getWizardEyeColor = () => getRandomItemFromArray(EYE_COLORS);

const showElement = (element) => {
  element.classList.remove(`hidden`);
};

const hideElement = (element) => {
  element.classList.add(`hidden`);
};

const getSimilarWizardTemplate = () => {
  return document
    .querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
};

const createRandomWizard = () => {
  return {
    name: getWizardName(),
    coatColor: getWizardCoatColor(),
    eyesColor: getWizardEyeColor()
  };
};

const generateSimilarWizards = (count) => {
  let wizards = [];

  for (let i = 0; i < count; i++) {
    const randomWizard = createRandomWizard();
    wizards.push(randomWizard);
  }

  return wizards;
};

const fillWizardElement = (wizardElement, wizard) => {
  const wizardNameElement = wizardElement.querySelector(`.setup-similar-label`);
  wizardNameElement.textContent = wizard.name;

  const wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
  wizardCoatElement.style.fill = wizard.coatColor;

  const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
  wizardEyesElement.style.fill = wizard.eyesColor;
};

const createSimilarWizardElement = (template, similarWizard) => {
  const fragment = document.createDocumentFragment();
  const similarWizardElement = template.cloneNode(true);
  fillWizardElement(similarWizardElement, similarWizard);
  fragment.append(similarWizardElement);
  return fragment;
};

const createSimilarWizardElements = (template, similarWizards) => {
  return similarWizards.map((similarWizard) => {
    return createSimilarWizardElement(template, similarWizard);
  });
};

const getNextItemFromArray = (item, array) => {
  const index = array.indexOf(item);
  return (index === array.length - 1) ? array[0] : array[index + 1];
};

const setupElement = document.querySelector(`.setup`);
const setupOpenElement = document.querySelector(`.setup-open`);
const setupCloseElement = setupElement.querySelector(`.setup-close`);
const setupPlayerElement = setupElement.querySelector(`.setup-player`);

const setupWizardEyesElement = setupPlayerElement.querySelector(`.wizard-eyes`);
const setupWizardEyesInputElement = setupPlayerElement.querySelector(`#eyes-color`);

const setupWizardCoatElement = setupPlayerElement.querySelector(`.wizard-coat`);
const setupWizardCoatInputElement = setupPlayerElement.querySelector(`#coat-color`);

const setupFireballWrapElement = setupPlayerElement.querySelector(`.setup-fireball-wrap`);
const setupFireballInputElement = setupPlayerElement.querySelector(`#fireball-color`);

const setupNameInputElement = setupElement.querySelector(`#username`);

const setupSimilarElement = setupElement.querySelector(`.setup-similar`);

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

const onSetupCloseClick = () => {
  hideElement(setupElement);

  setupCloseElement.removeEventListener(`click`, onSetupCloseClick);
};

const onSetupCloseEnterPressed = (event) => {
  if (event.key === `Enter`) {
    closeSetup();
  }
};

const setupHasFocus = () => document.activeElement === setupNameInputElement;

const onSetupEscPressed = (event) => {
  if (event.key === `Escape` && !setupHasFocus()) {
    closeSetup();
  }
};

const openSetup = () => {
  showElement(setupElement);

  setupCloseElement.addEventListener(`click`, onSetupCloseClick);
  setupCloseElement.addEventListener(`keydown`, onSetupCloseEnterPressed);
  document.addEventListener(`keydown`, onSetupEscPressed);

  setupWizardEyesElement.addEventListener(`click`, onWizardEyesClick);
  setupWizardCoatElement.addEventListener(`click`, onWizardCoatClick);
  setupFireballWrapElement.addEventListener(`click`, onFireballClick);
};

const closeSetup = () => {
  hideElement(setupElement);

  setupCloseElement.removeEventListener(`click`, onSetupCloseClick);
  setupCloseElement.removeEventListener(`keydown`, onSetupCloseEnterPressed);
  document.removeEventListener(`keydown`, onSetupEscPressed);

  setupWizardEyesElement.removeEventListener(`click`, onWizardEyesClick);
  setupWizardCoatElement.removeEventListener(`click`, onWizardCoatClick);
  setupFireballWrapElement.removeEventListener(`click`, onFireballClick);

};

setupOpenElement.addEventListener(`click`, () => {
  openSetup();
});
setupOpenElement.addEventListener(`keydown`, (event) => {
  if (event.key === `Enter`) {
    openSetup();
  }
});

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = getSimilarWizardTemplate();
const similarWizards = generateSimilarWizards(SIMILAR_WIZARDS_COUNT);
const similarWizardElements = createSimilarWizardElements(similarWizardTemplate, similarWizards);
similarListElement.append(...similarWizardElements);
showElement(setupSimilarElement);
