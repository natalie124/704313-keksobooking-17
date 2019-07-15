'use strict';

(function () {

  var Selector = {
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    PRICE: '#price',
    ADDRESS: '#address',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price',
    ROOMS: '#room_number',
    CAPACITY: '#capacity',
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

  var fieldsValuesById = getFieldsValuesById(); // объект, содержащий id полей формы как ключи и value как значения
  /**
   * получает объект, содержащий id полей формы как ключи и value как значения
   *
   * @return {object} объект с данными полей формы
   */
  function getFieldsValuesById() {
    var valuesById = {};
    var fields = form.querySelectorAll('[id]');
    fields.forEach(function (field) {
      valuesById[field.id] = field.value;
    });
    return valuesById;
  }
  /**
   * возвращает поля формы в изначальное состояние
   *
   */
  function cleanForm() {
    var fields = form.querySelectorAll('[id]');
    var cleanFields = Array.from(fields).filter(function (field) {
      return fieldsValuesById.hasOwnProperty(field.id);
    });
    cleanFields.forEach(function (cleanField) {
      cleanField.value = fieldsValuesById[cleanField.id];
      if (cleanField.type === 'checkbox') {
        cleanField.checked = false;
      }
    });
    minPrice.placeholder = window.card.types[type.value].price;
    address.value = window.util.getCoordinates(mainPin, 0, 0);
  }
  /**
   * проверяет вместимость жилья
   *
   * @param {number} numberOfRooms количество комнат
   * @param {number} numberOfGuests количество гостей
   * @return {string} сообщение о неверно выбранной вместимости
   */
  function checkCapacity(numberOfRooms, numberOfGuests) {
    var message = '';
    if (numberOfRooms === 100 && numberOfGuests !== 0) {
      message = '100 комнат — «не для гостей»';
    } else if (numberOfRooms === 1 && numberOfGuests !== 1) {
      message = '1 комната — «для 1 гостя»';
    } else if (numberOfRooms === 2 && (numberOfGuests > 2 || numberOfGuests === 0)) {
      message = '2 комнаты — «для 2 гостей» или «для 1 гостя»';
    } else if (numberOfRooms === 3 && (numberOfGuests > 3 || numberOfGuests === 0)) {
      message = '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
    }
    return message;
  }
  /**
   * обработчик события change (для поля type)
   *
   * @param {object} evt объект события
   */
  function onHouseTypeChange(evt) {
    minPrice.min = window.card.types[evt.target.value].price;
    minPrice.placeholder = window.card.types[evt.target.value].price;
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
    var message = checkCapacity(roomsValue, capacityValue);

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
    var message = checkCapacity(roomsValue, capacityValue);

    capacity.setCustomValidity(message);
  }
  // добавляем событие change для поля выбора типа жилья
  type.addEventListener('change', onHouseTypeChange);
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', onTimeinChange);
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', onTimeoutChange);
  // добавляем событие change для поля выбора количества гостей
  capacity.addEventListener('change', onCapacityChange);
  // добавляем событие change для поля выбора количества комнат
  rooms.addEventListener('change', onRoomsChange);

  window.cleanForm = cleanForm;

})();
