'use strict';

(function () {

  var deps = { // зависимости
    util: window.util,
    data: window.data,
    pins: window.pins
  };

  var map = document.querySelector('.map'); // блок с картой объявлений
  var mainPin = map.querySelector('.map__pin--main'); // блок с меткой

  var adForm = document.querySelector('.ad-form'); // блок с формой
  var formElements = document.querySelectorAll('fieldset'); // блоки с элементами форм на странице
  var address = adForm.querySelector('#address'); // поле с адресом метки


  var mapFilter = map.querySelector('.map__filters'); // блок с фильтром
  var mapFilters = mapFilter.querySelectorAll('.map__filter'); // блоки с элементами фильтра

  /**
   * активирует Букинг
   *
   */
  function activateBooking() {

    deps.util.removeClass(map, 'map--faded');
    deps.util.removeClass(adForm, 'ad-form--disabled');
    deps.util.removeClass(mapFilter, 'ad-form--disabled');

    deps.util.removeAttribute(mapFilters, 'disabled');
    deps.util.removeAttribute(formElements, 'disabled');

    deps.pins.drawPins(deps.data.ads.length, deps.data.ads);
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
      if (mainPin.offsetTop < deps.data.heightLimiters.min - mainPin.offsetHeight) {
        mainPinTop = deps.data.heightLimiters.min - mainPin.offsetHeight;
      }
      if (mainPinTop > deps.data.heightLimiters.max - mainPin.offsetHeight) {
        mainPinTop = deps.data.heightLimiters.max - mainPin.offsetHeight;
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

    if (map.classList.contains('map--faded')) {
      activateBooking();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // скрываем фильтр
  deps.util.addClass(mapFilter, 'ad-form--disabled');
  // добавляем атрибут disabled элементам формы
  deps.util.addAttribute(formElements, 'disabled', 'disabled');
  deps.util.addAttribute(mapFilters, 'disabled', 'disabled');
  // добавляет событие перетаскивания метке
  mainPin.addEventListener('mousedown', onMainPinMouseDown);

})();
