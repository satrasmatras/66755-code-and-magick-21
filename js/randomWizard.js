'use strict';

(function () {
  const {getRandomItemFromArray} = window.random;
  const {NAMES, SURNAMES, COAT_COLORS, EYE_COLORS} = window.wizardData;

  const getWizardName = () => {
    const randomName = getRandomItemFromArray(NAMES);
    const randomSurname = getRandomItemFromArray(SURNAMES);
    return `${randomName} ${randomSurname}`;
  };

  const getWizardCoatColor = () => getRandomItemFromArray(COAT_COLORS);

  const getWizardEyeColor = () => getRandomItemFromArray(EYE_COLORS);

  const createRandomWizard = () => {
    return {
      name: getWizardName(),
      coatColor: getWizardCoatColor(),
      eyesColor: getWizardEyeColor()
    };
  };

  window.randomWizard = {
    createRandomWizard,
  };
})();
