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
    },

    shuffle: function (arr) {
      var j;
      var temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    }
  };
})();
