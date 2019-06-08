'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_AMOUNT = 4;

var getRandomItem = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}

var generateWizards = function (names, surnames, coats, eyes, amount) {
  var wizards = [];
  var i = 0;
  while (i < amount) {
    var wizard = {};
    wizard.name = getRandomItem(names) + ' ' + getRandomItem(surnames);
    wizard.coatColor = getRandomItem(coats);
    wizard.eyesColor = getRandomItem(eyes);
    wizards.push(wizard);
    i++;
  }
  return wizards;
}

var createWizard = function (wizardObj) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizardObj.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardObj.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardObj.eyesColor;
  similarListElement.appendChild(wizardElement);
}

var addWizards = function () {
  var wizards = generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES, WIZARD_AMOUNT);
  for (var i = 0; i < wizards.length; i++) {
    createWizard(wizards[i]);
  }
};

addWizards();
