'use strict';

(function () {
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var inputCoat = setupPlayer.querySelector('input[name="coat-color"]');
  var inputEyes = setupPlayer.querySelector('input[name="eyes-color"]');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var inputFireball = fireball.querySelector('input[name="fireball-color"]');

  // настройки персонажа

  var deleteWizards = function () {
    var wizards = Array.from(document.querySelectorAll('.setup-similar-item'));
    wizards.forEach(function (elem) {
      elem.remove();
    });
  };

  var changeColorFill = function (elem, array, input) {
    var nextColor = window.util.getRandomItem(array);
    input.value = nextColor;
    elem.style.fill = nextColor;
    return nextColor;
  };

  var changeColorBackground = function (array) {
    var color = window.util.getRandomItem(array);
    fireball.style.background = color;
    inputFireball.value = color;
  };

  wizardCoat.addEventListener('click', function () {
    changeColorFill(wizardCoat, WIZARD_COATS, inputCoat);

    onCoatChange(inputCoat.value);
  });

  wizardEyes.addEventListener('click', function () {
    changeColorFill(wizardEyes, WIZARD_EYES, inputEyes);

    onEyesChange(inputEyes.value);
  });

  fireball.addEventListener('click', function () {
    changeColorBackground(WIZARD_FIREBALLS);
  });

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.addWizards(wizards.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
  };

  var onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    deleteWizards();
    updateWizards();
  });

  var onCoatChange = window.debounce(function (color) {
    coatColor = color;
    deleteWizards();
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data.slice();
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.similar = {
    errorHandler: errorHandler
  };

  window.backend.load(successHandler, errorHandler);
})();
