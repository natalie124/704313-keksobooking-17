'use strict';
(function () {
  var Selector = {
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    PRICE: '#price',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price',
    ROOMS: '#room_number',
    CAPACITY: '#capacity',
    ADDRESS: '#address'
  };
  var StartCoordOfMainPin = {
    X: 570,
    Y: 375
  };
  var mainPin = document.querySelector(Selector.MAIN_PIN); // блок с меткой
  var adForm = document.querySelector(Selector.FORM); // блок с формой
  var type = adForm.querySelector(Selector.TYPE); // поле тип жилья
  var timein = adForm.querySelector(Selector.TIMEIN); // поле дата заезда
  var timeout = adForm.querySelector(Selector.TIMEOUT); // поле дата выезда
  var minPrice = adForm.querySelector(Selector.MIN_PRICE); // минимальная цена
  var rooms = adForm.querySelector(Selector.ROOMS); // количество комнат
  var capacity = adForm.querySelector(Selector.CAPACITY); // количество гостей
  var address = document.querySelector(Selector.ADDRESS); // адрес жилья
  /**
   * возвращает форму подачи объявления в первоначальное состояние
   *
   */
  function cleanAdForm() {
    adForm.reset();
    mainPin.style.left = StartCoordOfMainPin.X + 'px';
    mainPin.style.top = StartCoordOfMainPin.Y + 'px';
    address.value = window.util.getCoordinates(mainPin, 0, 0);
    minPrice.placeholder = window.card.types[type.value].price;
    window.avatar.reset();
    window.photos.remove();
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
   * добавляет событие change для поля выбора типа жилья
   *
   * @param {object} evt количество комнат
   *
   */
  function onTypeChange(evt) {
    minPrice.min = window.card.types[evt.target.value].price;
    minPrice.placeholder = window.card.types[evt.target.value].price;
  }
  /**
   * добавляет событие change для поля выбора даты заезда
   *
   * @param {object} evt количество комнат
   *
   */
  function onTimeinChange(evt) {
    timeout.value = evt.target.value;
  }
  /**
   * добавляет событие change для поля выбора даты выезда
   *
   * @param {object} evt количество комнат
   *
   */
  function onTimeoutChange(evt) {
    timein.value = evt.target.value;
  }
  /**
   * добавляет событие change для поля выбора количества гостей
   *
   * @param {object} evt количество комнат
   *
   */
  function onCapacityChange(evt) {
    var roomsValue = parseInt(rooms.value, 10);
    var capacityValue = parseInt(evt.target.value, 10);
    var message = checkCapacity(roomsValue, capacityValue);
    capacity.setCustomValidity(message);
  }
  /**
   * добавляет событие change для поля выбора количества комнат
   *
   * @param {object} evt количество комнат
   *
   */
  function onRoomChange(evt) {
    var roomsValue = parseInt(evt.target.value, 10);
    var capacityValue = parseInt(capacity.value, 10);
    var message = checkCapacity(roomsValue, capacityValue);
    capacity.setCustomValidity(message);
  }
  // добавляем событие change для поля выбора типа жилья
  type.addEventListener('change', onTypeChange);
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', onTimeinChange);
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', onTimeoutChange);
  // добавляем событие change для поля выбора количества гостей
  capacity.addEventListener('change', onCapacityChange);
  // добавляем событие change для поля выбора количества комнат
  rooms.addEventListener('change', onRoomChange);

  window.form = {
    clean: cleanAdForm
  };

})();
