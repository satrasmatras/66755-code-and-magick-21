'use strict';

(() => {
  const {showElement} = window.domHelper;
  const {setupElement} = window.elements;
  const {createSimilarWizardElement} = window.similarWizard;
  const {load} = window.backend;
  const {onError} = window.message;

  const SIMILAR_WIZARDS_COUNT = 4;

  const setupSimilarElement = setupElement.querySelector(`.setup-similar`);
  const similarListElement = document.querySelector(`.setup-similar-list`);

  const renderSimilarWizardsElements = (wizards) => {
    const fragment = document.createDocumentFragment();

    wizards.forEach((wizard) => {
      const similarWizardElement = createSimilarWizardElement(wizard);
      fragment.append(similarWizardElement);
    });

    similarListElement.append(fragment);
  };

  const clearSimilarWizardsList = () => {
    similarListElement.innerHTML = ``;
  };

  const onWizardsLoad = (wizards) => {
    const randomWizards = wizards.slice(0, SIMILAR_WIZARDS_COUNT);

    renderSimilarWizardsElements(randomWizards);
    showElement(setupSimilarElement);
  };

  const showSimilarWizardsList = () => {
    load(onWizardsLoad, onError);
  };

  window.similarWizards = {
    showSimilarWizardsList,
    clearSimilarWizardsList
  };
})();
