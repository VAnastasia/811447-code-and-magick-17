'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_AMOUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_START_Y = '80px';
  var SETUP_START_X = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

  var setupPlayer = document.querySelector('.setup-player');
  var wizardCoat = setupPlayer.querySelector('.wizard-coat');
  var wizardEyes = setupPlayer.querySelector('.wizard-eyes');
  var inputCoat = setupPlayer.querySelector('input[name="coat-color"]');
  var inputEyes = setupPlayer.querySelector('input[name="eyes-color"]');
  var fireball = setupPlayer.querySelector('.setup-fireball-wrap');
  var inputFireball = fireball.querySelector('input[name="fireball-color"]');

  var form = document.querySelector('.setup-wizard-form');
  var userName = form.querySelector('.setup-user-name');

  // Открытие/закрытие окна настройки персонажа

  var openSimilarWizards = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onUserNameEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
      userName.blur();
    }
  };

  var focusUserName = function () {
    userName.addEventListener('keydown', onUserNameEscPress);
  };

  userName.addEventListener('focus', focusUserName);


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    window.dialog.dialogHandler.addEventListener('mousedown', window.dialog.onDragDialog);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    window.dialog.dialogHandler.removeEventListener('mousedown', window.dialog.onDragDialog);
    setup.style.top = SETUP_START_Y;
    setup.style.left = SETUP_START_X;
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
    openSimilarWizards();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
      openSimilarWizards();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  // настройки персонажа

  var changeColorFill = function (elem, array, input) {
    var currentColor = elem.style.fill;
    var nextColor = window.util.getNextItem(currentColor, array);
    input.value = nextColor;
    elem.style.fill = nextColor;
  };

  var changeColorBackground = function (array) {
    var color = window.util.getRandomItem(array);
    fireball.style.background = color;
    inputFireball.value = color;
  };

  wizardCoat.addEventListener('click', function () {
    changeColorFill(wizardCoat, WIZARD_COATS, inputCoat);
  });

  wizardEyes.addEventListener('click', function () {
    changeColorFill(wizardEyes, WIZARD_EYES, inputEyes);
  });

  fireball.addEventListener('click', function () {
    changeColorBackground(WIZARD_FIREBALLS);
  });

  // похожие персонажи

  var generateWizards = function (names, surnames, coats, eyes, amount) {
    var wizards = [];
    for (var i = 0; i < amount; i++) {
      var wizard = {};
      wizard.name = window.util.getRandomItem(names) + ' ' + window.util.getRandomItem(surnames);
      wizard.coatColor = window.util.getRandomItem(coats);
      wizard.eyesColor = window.util.getRandomItem(eyes);
      wizards.push(wizard);
    }
    return wizards;
  };

  var createWizard = function (wizardObj) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardObj.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardObj.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardObj.eyesColor;
    return wizardElement;
  };

  var addWizards = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var wizards = generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES, WIZARD_AMOUNT);
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  addWizards();

  // добавления инвентаря в рюкзак

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
