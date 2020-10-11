'use strict';

(() => {
  const {showElement} = window.domHelper;
  const {setupElement} = window.elements;
  const {load} = window.backend;
  const {onError} = window.message;

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
    wizardCoatElement.style.fill = wizard.colorCoat;

    const wizardEyesElement = wizardElement.querySelector(`.wizard-eyes`);
    wizardEyesElement.style.fill = wizard.colorEyes;
  };

  const createSimilarWizardElement = (wizard) => {
    const similarWizardElement = similarWizardTemplate.cloneNode(true);

    fillWizardElement(similarWizardElement, wizard);

    return similarWizardElement;
  };

  const createSimilarWizardElements = (wizards) => {
    const similarWizardElements = [];

    for (let wizard of wizards) {
      const similarWizardElement = createSimilarWizardElement(wizard);
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

  const onLoad = (wizards) => {
    const randomWizards = wizards.slice(0, SIMILAR_WIZARDS_COUNT);
    const wizardElements = createSimilarWizardElements(randomWizards);
    renderSimilarWizardsElements(wizardElements);
    showElement(setupSimilarElement);
  };

  const showSimilarWizardsList = () => {
    load(onLoad, onError);
  };

  window.similarWizards = {
    showSimilarWizardsList,
    clearSimilarWizardsList
  };
})();
