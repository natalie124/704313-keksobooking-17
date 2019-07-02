'use strict';

(function () {

  var deps = { // зависимости
    util: window.util,
    pins: window.pins,
    backend: window.backend
  };

  var ClassName = {
    FORM_DISABLED: 'ad-form--disabled',
    MAP_FADED: 'map--faded'
  };

  var Selector = {
    MAIN: 'main',

    MAP: '.map',
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    FORM_ITEM: 'fieldset',
    ADDRESS: '#address',

    FILTER: '.map__filters',
    FILTER_ITEM: '.map__filter',

    ERROR_TEMPLATE: '#error',
    ERROR: '.error',
    ERROR_BUTTON: '.error__button',
    ERROR_MESSAGE: '.error__message'
  };

  var PIN_Y_MIN = 130; // минимальная координата позиции метки по Y
  var PIN_Y_MAX = 630; // максимальная координата позиции метки по Y

  var map = document.querySelector(Selector.MAP); // блок с картой объявлений
  var mainPin = map.querySelector(Selector.MAIN_PIN); // блок с меткой

  var form = document.querySelector(Selector.FORM); // блок с формой
  var formItems = document.querySelectorAll(Selector.FORM_ITEM); // блоки с элементами форм на странице
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки

  var filter = map.querySelector(Selector.FILTER); // блок с фильтром
  var filterItems = filter.querySelectorAll(Selector.FILTER_ITEM); // блоки с элементами фильтра

  var errorLocation = document.querySelector(Selector.MAIN);
  var errorTemplate = document.querySelector(Selector.ERROR_TEMPLATE).content.querySelector(Selector.ERROR);
  var error = errorTemplate.cloneNode(true);
  var errorButton = error.querySelector(Selector.ERROR_BUTTON);

  /**
   * активирует Букинг
   *
   */
  function activateBooking() {

    deps.util.removeClass(map, ClassName.MAP_FADED);
    deps.util.removeClass(form, ClassName.FORM_DISABLED);
    deps.util.removeClass(filter, ClassName.FORM_DISABLED);

    deps.util.removeDisabled(filterItems);
    deps.util.removeDisabled(formItems);

    deps.backend.load(deps.pins.drawPins, onError);
  }
  /**
   * скрывает букинг
   *
   */
  function hideBooking() {
    deps.util.addClass(map, ClassName.MAP_FADED);
    deps.util.addClass(filter, ClassName.FORM_DISABLED);
    deps.util.addClass(form, ClassName.FORM_DISABLED);
    deps.util.addDisabled(formItems);
    deps.util.addDisabled(filterItems);
  }
  /**
   * выводит сообщение об ошибке, если ошибка возникла
   * @param {string} errorMessage сообщение об ошибке
   *
   */
  function onError(errorMessage) {
    error.querySelector(Selector.ERROR_MESSAGE).textContent = errorMessage;
    errorLocation.appendChild(error);
    /**
     * удаляет сообщение об ошибке
     *
     */
    function removeError() {
      error.remove();
      hideBooking();
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('keydown', onEnterPress);
    }
    /**
     * обработчик события Enter press
     * @param {object} evt объект события
     *
     */
    function onEnterPress(evt) {
      evt.preventDefault();
      deps.util.isEnterEvent(evt, removeError);
    }
    /**
     * обработчик события Esc press
     * @param {object} evt объект события
     *
     */
    function onEscPress(evt) {
      evt.preventDefault();
      deps.util.isEscEvent(evt, removeError);
    }
    errorButton.addEventListener('click', removeError);
    document.addEventListener('keydown', onEnterPress);
    document.addEventListener('keydown', onEscPress);
  }
  /**
   * обработчик события mousedown (для метки)
   * @param {object} evt объект события
   *
   */
  function onMainPinMouseDown(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    /**
     * обработчик события mousemove (для метки)
     * @param {object} moveEvt объект события
     *
     */
    function onMouseMove(moveEvt) {
      var mainPinLeft = mainPin.offsetLeft;
      var mainPinTop = mainPin.offsetTop;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      moveEvt.preventDefault();

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinTop = (mainPinTop - shift.y);
      mainPinLeft = (mainPinLeft - shift.x);

      if (mainPinLeft < 0) {
        mainPinLeft = 0;
      }
      if (mainPinLeft > map.offsetWidth - mainPin.offsetWidth) {
        mainPinLeft = map.offsetWidth - mainPin.offsetWidth;
      }
      if (mainPin.offsetTop < PIN_Y_MIN - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MIN - mainPin.offsetHeight;
      }
      if (mainPinTop > PIN_Y_MAX - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MAX - mainPin.offsetHeight;
      }

      mainPin.style.left = mainPinLeft + 'px';
      mainPin.style.top = mainPinTop + 'px';
    }
    /**
     * обработчик события mouseup (для метки)
     * @param {object} upEvt объект события
     *
     */
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      address.value = deps.util.getCoordinates(mainPin, mainPin.offsetWidth / 2, mainPin.offsetHeight);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    evt.preventDefault();

    if (map.classList.contains(ClassName.MAP_FADED)) {
      activateBooking();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  hideBooking();
  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
