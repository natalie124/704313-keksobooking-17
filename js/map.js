'use strict';

(function () {

  var ClassName = {
    FORM_DISABLED: 'ad-form--disabled',
    MAP_FADED: 'map--faded'
  };

  var Selector = {
    MAIN: 'main',

    MAP: '.map',

    FORM: '.ad-form',
    FORM_ITEM: 'fieldset',

    FILTER: '.map__filters',
    FILTER_ITEM: '.map__filter',

    ERROR_TEMPLATE: '#error',
    ERROR: '.error',
    ERROR_BUTTON: '.error__button',
    ERROR_MESSAGE: '.error__message',
  };

  var map = document.querySelector(Selector.MAP); // блок с картой объявлений

  var form = document.querySelector(Selector.FORM); // блок с формой
  var formItems = document.querySelectorAll(Selector.FORM_ITEM); // блоки с элементами форм на странице

  var filter = map.querySelector(Selector.FILTER); // блок с фильтром
  var filterItems = filter.querySelectorAll(Selector.FILTER_ITEM); // блоки с элементами фильтра

  var errorLocation = document.querySelector(Selector.MAIN); // блок, в котором будет отображаться ошибка
  var errorTemplate = document.querySelector(Selector.ERROR_TEMPLATE).content.querySelector(Selector.ERROR); // шаблон ошибки
  var error = errorTemplate.cloneNode(true); // разметка ошибки
  var errorButton = error.querySelector(Selector.ERROR_BUTTON); // кнопка 'закрыть ошибку'

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

    errorButton.addEventListener('click', removeError);
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

  hideBooking();

  window.map = {
    activate: activateBooking
  };

})();
