'use strict';

(function () {
  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomItemFromArray = (array) => {
    return array[getRandomNumberInRange(0, array.length - 1)];
  };

  const getNextItemFromArray = (item, array) => {
    const index = array.indexOf(item);
    return (index === array.length - 1) ? array[0] : array[index + 1];
  };

  window.random = {
    getRandomNumberInRange,
    getRandomItemFromArray,
    getNextItemFromArray
  };
})();
