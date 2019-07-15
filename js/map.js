'use strict';

(function () {
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
    RESET: '.ad-form__reset',
    ADDRESS: '#address',

    FILTER: '.map__filters',
    FILTER_ITEM: '.map__filter',

    ERROR_TEMPLATE: '#error',
    ERROR: '.error',
    ERROR_MESSAGE: '.error__message',

    SUCCESS_TEMPLATE: '#success',
    SUCCESS: '.success'
  };
  var map = document.querySelector(Selector.MAP); // блок с картой объявлений
  var mainPin = map.querySelector(Selector.MAIN_PIN); // блок с меткой
  var form = document.querySelector(Selector.FORM); // блок с формой
  var formItems = document.querySelectorAll(Selector.FORM_ITEM); // блоки с элементами форм на странице
  var address = document.querySelector(Selector.ADDRESS);
  var reset = form.querySelector(Selector.RESET);
  var filter = map.querySelector(Selector.FILTER); // блок с фильтром
  var filterItems = filter.querySelectorAll(Selector.FILTER_ITEM); // блоки с элементами фильтра
  /**
   * активирует Букинг
   *
   */
  function activateBooking() {
    window.util.removeClass(map, ClassName.MAP_FADED);
    window.util.removeClass(form, ClassName.FORM_DISABLED);
    window.util.removeClass(filter, ClassName.FORM_DISABLED);
    window.util.removeDisabled(filterItems);
    window.util.removeDisabled(formItems);
    window.backend.load(onLoad, onError);
  }
  /**
   * скрывает букинг
   *
   */
  function hideBooking() {
    window.util.addClass(map, ClassName.MAP_FADED);
    window.util.addClass(filter, ClassName.FORM_DISABLED);
    window.util.addClass(form, ClassName.FORM_DISABLED);
    window.util.addDisabled(formItems);
    window.util.addDisabled(filterItems);
    window.pins.remove();
    window.card.remove();
    form.reset();
    address.value = window.util.getCoordinates(mainPin, 0, 0);
  }
  /**
   * выводит сообщение об ошибке, если ошибка возникла
   * @param {string} errorMessage сообщение об ошибке
   *
   */
  function onError(errorMessage) {
    var errorLocation = document.querySelector(Selector.MAIN);
    var errorTemplate = document.querySelector(Selector.ERROR_TEMPLATE).content.querySelector(Selector.ERROR);
    var error = errorTemplate.cloneNode(true);

    error.querySelector(Selector.ERROR_MESSAGE).textContent = errorMessage;
    errorLocation.appendChild(error);
    hideBooking();
    /**
     * удаляет сообщение об ошибке
     *
     */
    function removeError() {
      error.remove();
      document.removeEventListener('click', removeError);
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
      window.util.isEnterEvent(evt, removeError);
    }
    /**
     * обработчик события Esc press
     * @param {object} evt объект события
     *
     */
    function onEscPress(evt) {
      evt.preventDefault();
      window.util.isEscEvent(evt, removeError);
    }

    document.addEventListener('click', removeError);
    document.addEventListener('keydown', onEnterPress);
    document.addEventListener('keydown', onEscPress);
  }
  /**
   * выводит сообщение об успешной отправке формы
   *
   */
  function onSuccess() {
    var successLocation = document.querySelector(Selector.MAIN);
    var successTemplate = document.querySelector(Selector.SUCCESS_TEMPLATE).content.querySelector(Selector.SUCCESS);
    var success = successTemplate.cloneNode(true);
    hideBooking();
    successLocation.appendChild(success);
    /**
     * удаляет сообщение об успешной отправке формы
     *
     */
    function removeSuccess() {
      success.remove();

      document.removeEventListener('click', removeSuccess);
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
      window.util.isEnterEvent(evt, removeSuccess);
    }
    /**
     * обработчик события Esc press
     * @param {object} evt объект события
     *
     */
    function onEscPress(evt) {
      evt.preventDefault();
      window.util.isEscEvent(evt, removeSuccess);
    }
    document.addEventListener('click', removeSuccess);
    document.addEventListener('keydown', onEnterPress);
    document.addEventListener('keydown', onEscPress);
  }
  /**
   * обработчик данных
   * @param {array} data массив с данными
   *
   */
  function onLoad(data) {
    window.pins.draw(data);
    window.onFilter(data);
  }
  /**
   * обработчик события keydown (для кнопки очистить)
   *
   * @param {object} evt объект события
   */
  function onResetEnterPress(evt) {
    evt.preventDefault();
    window.util.isEnterEvent(evt, hideBooking);
  }

  hideBooking();

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });
  // добавляем событие очистки формы клику на кнопке 'очистить'
  reset.addEventListener('click', hideBooking);
  // добавляем событие очистки формы нажатию Enter на кнопке 'очистить'
  reset.addEventListener('keydown', onResetEnterPress);

  window.map = {
    activate: activateBooking,
    hide: hideBooking,
    onError: onError
  };
})();
