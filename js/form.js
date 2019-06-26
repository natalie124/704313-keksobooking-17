'use strict';

(function () {

  var deps = {
    util: window.util,
    data: window.data
  };

  var adForm = document.querySelector('.ad-form'); // блок с формой
  var address = adForm.querySelector('#address'); // поле с адресом метки
  var houseType = adForm.querySelector('#type'); // поле тип жилья
  var timein = adForm.querySelector('#timein'); // поле дата заезда
  var timeout = adForm.querySelector('#timeout'); // поле дата выезда

  var mainPin = document.querySelector('.map__pin--main'); // блок с меткой
  /**
   * обработчик события change (для поля type)
   *
   * @param {object} evt объект события
   */
  function onHouseTypeChange(evt) {
    var housePrice = adForm.querySelector('#price');

    housePrice.min = deps.data.housingTypes[evt.target.value].price;
    housePrice.placeholder = deps.data.housingTypes[evt.target.value].price;
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

  address.value = deps.util.getCoordinates(mainPin, 0, 0);

  houseType.addEventListener('change', onHouseTypeChange);
  // добавляем событие change для поля дата заезда
  timein.addEventListener('change', onTimeinChange);
  // добавляем событие change для поля дата выезда
  timeout.addEventListener('change', onTimeoutChange);

})();
