'use strict';

(function () {

  var TYPES = { // типы объявлений
    palace: {
      price: 10000
    },
    flat: {
      price: 1000
    },
    house: {
      price: 5000
    },
    bungalo: {
      price: 0
    }
  };

  var Selector = {
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    ADDRESS: '#address',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price'
  };

  var mainPin = document.querySelector(Selector.MAIN_PIN); // блок с меткой

  var form = document.querySelector(Selector.FORM); // блок с формой
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки
  var type = form.querySelector(Selector.TYPE); // поле тип жилья
  var timein = form.querySelector(Selector.TIMEIN); // поле дата заезда
  var timeout = form.querySelector(Selector.TIMEOUT); // поле дата выезда
  var minPrice = form.querySelector(Selector.MIN_PRICE); // минимальная цена

  /**
   * обработчик события change (для поля type)
   *
   * @param {object} evt объект события
   */
  function onHouseTypeChange(evt) {

    minPrice.min = TYPES[evt.target.value].price;
    minPrice.placeholder = TYPES[evt.target.value].price;
  }
  /**
   * обработчик события change (для поля timein)
   *
   * @param {object} evt объект события
   */
  function onTimeinChange(evt) {
    timeout.value = evt.target.value;
  }
  /**
   * обработчик события change (для поля timeout)
   *
   * @param {object} evt объект события
   */
  function onTimeoutChange(evt) {
    timein.value = evt.target.value;
  }

  address.value = window.util.getCoordinates(mainPin, 0, 0);

  type.addEventListener('change', onHouseTypeChange);
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', onTimeinChange);
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', onTimeoutChange);

})();
