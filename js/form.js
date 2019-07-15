'use strict';

(function () {

  var Selector = {
    FORM: '.ad-form',
    PRICE: '#price',
    TYPE: '#type',
    TIMEIN: '#timein',
    TIMEOUT: '#timeout',
    MIN_PRICE: '#price',
    ROOMS: '#room_number',
    CAPACITY: '#capacity',
  };

  var form = document.querySelector(Selector.FORM); // блок с формой
  var type = form.querySelector(Selector.TYPE); // поле тип жилья
  var timein = form.querySelector(Selector.TIMEIN); // поле дата заезда
  var timeout = form.querySelector(Selector.TIMEOUT); // поле дата выезда
  var minPrice = form.querySelector(Selector.MIN_PRICE); // минимальная цена
  var rooms = form.querySelector(Selector.ROOMS); // количество комнат
  var capacity = form.querySelector(Selector.CAPACITY); // количество гостей

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
  // добавляем событие change для поля выбора типа жилья
  type.addEventListener('change', function (evt) {
    minPrice.min = window.card.types[evt.target.value].price;
    minPrice.placeholder = window.card.types[evt.target.value].price;
  });
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });
  // добавляем событие change для поля выбора количества гостей
  capacity.addEventListener('change', function (evt) {
    var roomsValue = parseInt(rooms.value, 10);
    var capacityValue = parseInt(evt.target.value, 10);
    var message = checkCapacity(roomsValue, capacityValue);

    capacity.setCustomValidity(message);
  });
  // добавляем событие change для поля выбора количества комнат
  rooms.addEventListener('change', function (evt) {
    var roomsValue = parseInt(evt.target.value, 10);
    var capacityValue = parseInt(capacity.value, 10);
    var message = checkCapacity(roomsValue, capacityValue);

    capacity.setCustomValidity(message);
  });

})();
