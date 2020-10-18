'use strict';

(() => {
  const {showElement} = window.domHelper;
  const {setupElement} = window.elements;
  const {createSimilarWizardElement} = window.similarWizard;

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

  const showSimilarWizardsList = (wizards) => {
    renderSimilarWizardsElements(wizards);
    showElement(setupSimilarElement);
  };

  window.similarWizards = {
    showSimilarWizardsList,
    clearSimilarWizardsList
  };
})();
