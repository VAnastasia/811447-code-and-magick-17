'use strict';

(function () {
  var WIZARD_AMOUNT = 4;
  // похожие персонажи

  var createWizard = function (wizardObj) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardObj.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardObj.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardObj.colorEyes;
    return wizardElement;
  };

  var addWizards = function (wizards) {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    var wizardsAmount = wizards.length > WIZARD_AMOUNT ? WIZARD_AMOUNT : wizards.length;
    for (var i = 0; i < wizardsAmount; i++) {
      fragment.appendChild(createWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.render = {
    addWizards: addWizards
  };
})();
