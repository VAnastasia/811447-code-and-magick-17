'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_START_Y = '80px';
  var SETUP_START_X = '50%';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');

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

  // сохранение отправленных данных

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, window.similar.errorHandler);

  });

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
