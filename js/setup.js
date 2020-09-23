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

const SIMILAR_WIZARDS_COUNT = 4;

const getRandomNumberInRange = (max) => {
  return Math.round(Math.random() * max);
};

const getRandomFromArray = (array) => {
  return array[getRandomNumberInRange(array.length - 1)];
};

const getWizardName = () => {
  const randomName = getRandomFromArray(NAMES);
  const randomSurname = getRandomFromArray(SURNAMES);
  return `${randomName} ${randomSurname}`;
};

const getWizardCoatColor = () => getRandomFromArray(COAT_COLORS);

const getWizardEyeColor = () => getRandomFromArray(EYE_COLORS);

const showElement = (selector) => {
  const element = document.querySelector(selector);
  element.classList.remove(`hidden`);
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
    wizards = [...wizards, randomWizard];
  }

  return wizards;
};

const fillWizardElement = (wizardElement, randomWizard) => {
  const wizardNameElement = wizardElement.querySelector(`.setup-similar-label`);
  wizardNameElement.textContent = randomWizard.name;

  const wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
  wizardCoatElement.style.fill = randomWizard.coatColor;

  const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
  wizardEyesElement.style.fill = randomWizard.eyesColor;
};

const createSimilarWizardElement = (template, similarWizard) => {
  const similarWizardElement = template.cloneNode(true);
  fillWizardElement(similarWizardElement, similarWizard);
  return similarWizardElement;
};

const createSimilarWizardElements = (template, similarWizards) => {
  return similarWizards.map((similarWizard) => {
    return createSimilarWizardElement(template, similarWizard);
  });
};

showElement(`.setup`);
showElement(`.setup-similar`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = getSimilarWizardTemplate();
const similarWizards = generateSimilarWizards(SIMILAR_WIZARDS_COUNT);
const similarWizardElements = createSimilarWizardElements(similarWizardTemplate, similarWizards);
similarListElement.append(...similarWizardElements);
