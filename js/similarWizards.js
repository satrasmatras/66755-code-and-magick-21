'use strict';

(() => {
  const {showElement} = window.domHelper;
  const {createRandomWizard} = window.randomWizard;
  const {setupElement} = window.elements;

  const SIMILAR_WIZARDS_COUNT = 4;

  const setupSimilarElement = setupElement.querySelector(`.setup-similar`);
  const similarListElement = document.querySelector(`.setup-similar-list`);

  const getSimilarWizardTemplate = () => {
    return document
      .querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);
  };

  const similarWizardTemplate = getSimilarWizardTemplate();

  const fillWizardElement = (wizardElement, wizard) => {
    const wizardNameElement = wizardElement.querySelector(`.setup-similar-label`);
    wizardNameElement.textContent = wizard.name;

    const wizardCoatElement = wizardElement.querySelector(`.wizard-coat`);
    wizardCoatElement.style.fill = wizard.coatColor;

    const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
    wizardEyesElement.style.fill = wizard.eyesColor;
  };

  const createSimilarWizardElement = () => {
    const similarWizardElement = similarWizardTemplate.cloneNode(true);

    const wizard = createRandomWizard();
    fillWizardElement(similarWizardElement, wizard);

    return similarWizardElement;
  };

  const createSimilarWizardElements = (count) => {
    const similarWizardElements = [];

    for (let i = 0; i < count; i++) {
      const similarWizardElement = createSimilarWizardElement();
      similarWizardElements.push(similarWizardElement);
    }

    return similarWizardElements;
  };

  const renderSimilarWizardsElements = (elements) => {
    const fragment = document.createDocumentFragment();
    fragment.append(...elements);
    similarListElement.append(fragment);
  };

  const clearSimilarWizardsList = () => {
    similarListElement.innerHTML = ``;
  };

  const showSimilarWizardsList = () => {
    const similarWizardElements = createSimilarWizardElements(SIMILAR_WIZARDS_COUNT);
    renderSimilarWizardsElements(similarWizardElements);
    showElement(setupSimilarElement);
  };

  window.similarWizards = {
    showSimilarWizardsList,
    clearSimilarWizardsList
  };
})();
