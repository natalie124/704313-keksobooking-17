'use strict';

(function() {

  var TYPES = { // типы объявлений
    palace: {
      price: 10000,
      name: 'Дворец'
    },
    flat: {
      price: 1000,
      name: 'Квартира'
    },
    house: {
      price: 5000,
      name: 'Дом'
    },
    bungalo: {
      price: 0,
      name: 'Бунгало'
    }
  };

  var Selector = {
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    ADDRESS: '#address',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price',
    ROOMS: '#room_number',
    CAPACITY: '#capacity'
  };

  var mainPin = document.querySelector(Selector.MAIN_PIN); // блок с меткой

  var form = document.querySelector(Selector.FORM); // блок с формой
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки
  var type = form.querySelector(Selector.TYPE); // поле тип жилья
  var timein = form.querySelector(Selector.TIMEIN); // поле дата заезда
  var timeout = form.querySelector(Selector.TIMEOUT); // поле дата выезда
  var minPrice = form.querySelector(Selector.MIN_PRICE); // минимальная цена
  var rooms = form.querySelector(Selector.ROOMS); // количество комнат
  var capacity = form.querySelector(Selector.CAPACITY); // количество гостей

  /**
   * проверяет вместимость жилья
   *
   * @param {number} rooms количество комнат
   * @param {number} capacity количество гостей
   * @return {string} сообщение о неверно выбранной вместимости
   */
  function checkChosenCapacity(rooms, capacity) {
    var message = '';
    if (rooms === 100 && capacity !== 0) {
      message = '100 комнат — «не для гостей»';
    } else if (rooms === 1 && capacity !== 1) {
      message = '1 комната — «для 1 гостя»';
    } else if (rooms === 2 && (capacity > 2 || capacity === 0)) {
      message = '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    } else if (rooms === 3 && (capacity > 3 || capacity === 0)) {
      message ='3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»'
    }
    return message;
  }
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
  /**
   * обработчик события change (для поля capacity)
   *
   * @param {object} evt объект события
   */
  function onCapacityChange(evt) {
    var roomsValue = parseInt(rooms.value, 10);
    var capacityValue = parseInt(evt.target.value, 10);
    var message = checkChosenCapacity(roomsValue, capacityValue);

    capacity.setCustomValidity(message);
  }
  /**
   * обработчик события change (для поля rooms)
   *
   * @param {object} evt объект события
   */
  function onRoomsChange(evt) {
    var roomsValue = parseInt(evt.target.value, 10);
    var capacityValue = parseInt(capacity.value, 10);
    var message = checkChosenCapacity(roomsValue, capacityValue);

    capacity.setCustomValidity(message);
  }

  address.value = window.util.getCoordinates(mainPin, 0, 0);

  type.addEventListener('change', onHouseTypeChange);
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', onTimeinChange);
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', onTimeoutChange);
  // добавляем событие change для поля выбора количества гостей
  capacity.addEventListener('change', onCapacityChange);
  // добавляем событие change для поля выбора количества комнат
  rooms.addEventListener('change', onRoomsChange);

  window.types = TYPES;

})();
