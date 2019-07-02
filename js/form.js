'use strict';

(function () {

  var types = { // типы объявлений
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

  var selectors = {
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    ADDRESS: '#address',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price'
  };

  var mainPin = document.querySelector(selectors.MAIN_PIN); // блок с меткой

  var form = document.querySelector(selectors.FORM); // блок с формой
  var address = form.querySelector(selectors.ADDRESS); // поле с адресом метки
  var type = form.querySelector(selectors.TYPE); // поле тип жилья
  var timein = form.querySelector(selectors.TIMEIN); // поле дата заезда
  var timeout = form.querySelector(selectors.TIMEOUT); // поле дата выезда
  var minPrice = form.querySelector(selectors.MIN_PRICE); // минимальная цена

  /**
   * обработчик события change (для поля type)
   *
   * @param {object} evt объект события
   */
  function onHouseTypeChange(evt) {

    minPrice.min = types[evt.target.value].price;
    minPrice.placeholder = types[evt.target.value].price;
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
