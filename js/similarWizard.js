'use strict';

(() => {
  const getSimilarWizardTemplate = () => {
    return document
      .querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);
  };

  const similarWizardTemplate = getSimilarWizardTemplate();

  const createSimilarWizardElement = (wizard) => {
    const similarWizardElement = similarWizardTemplate.cloneNode(true);

    const wizardNameElement = similarWizardElement.querySelector(`.setup-similar-label`);
    wizardNameElement.textContent = wizard.name;

    const wizardCoatElement = similarWizardElement.querySelector(`.wizard-coat`);
    wizardCoatElement.style.fill = wizard.coatColor;

    const wizardEyesElement = similarWizardElement.querySelector(`.wizard-eyes`);
    wizardEyesElement.style.fill = wizard.eyesColor;

    return similarWizardElement;
  };

  window.similarWizard = {
    createSimilarWizardElement
  };
})();
