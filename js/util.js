'use strict';

window.util = (function () {
  return {
    getRandomItem: function (array) {
      return array[Math.round(Math.random() * (array.length - 1))];
    },
    getNextItem: function (value, array) {
      var currentIndex = -1;
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
          currentIndex = i;
        }
      }
      return currentIndex === (array.length - 1 || -1) ? array[0] : array[currentIndex + 1];
    }
  };
})();
