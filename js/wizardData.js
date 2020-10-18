'use strict';

(() => {
  const {getRandomItemFromArray} = window.random;

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

  const getWizardName = () => {
    const randomName = getRandomItemFromArray(NAMES);
    const randomSurname = getRandomItemFromArray(SURNAMES);
    return `${randomName} ${randomSurname}`;
  };

  const getWizardCoatColor = () => getRandomItemFromArray(COAT_COLORS);

  const getWizardEyeColor = () => getRandomItemFromArray(EYE_COLORS);

  const generateRandomWizard = () => {
    return {
      name: getWizardName(),
      coatColor: getWizardCoatColor(),
      eyesColor: getWizardEyeColor()
    };
  };

  const generateRandomWizards = (count) => {
    const randomWizards = [];

    for (let i = 0; i < count; i++) {
      const randomWizard = generateRandomWizard();
      randomWizards.push(randomWizard);
    }

    return randomWizards;
  };

  window.wizardData = {
    NAMES,
    SURNAMES,
    COAT_COLORS,
    EYE_COLORS,
    FIREBALL_COLORS,
    generateRandomWizard,
    generateRandomWizards
  };
})();
