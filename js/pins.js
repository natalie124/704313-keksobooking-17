'use strict';
(function () {
  var ClassName = {
    PIN_ACTIVE: 'map__pin--active'
  };
  var Selector = {
    PINS: '.map__pins',
    PIN_TEMPLATE: '#pin',
    PIN: '.map__pin',
    OFFER_PINS: '.map__pin:not(.map__pin--main)'
  };

  var QUANTITY = 5; // количество пинов для отрисовки

  var pins = document.querySelector(Selector.PINS);
  /**
   * получает разметку c данными объявления
   *
   * @param {object} object объект с данными объявления
   * @return {object} готовая разметка
   */
  function getPin(object) {
    var template = document.querySelector(Selector.PIN_TEMPLATE).content.querySelector(Selector.PIN);
    var element = template.cloneNode(true);
    /**
     * добавляет событие фокуса для метки
     * @param {object} evt объект события
     *
     */
    function onPinFocus(evt) {
      window.util.addClass(evt.target, ClassName.PIN_ACTIVE);
    }
    /**
     * добавляет событие потери фокуса для метки
     * @param {object} evt объект события
     *
     */
    function onPinBlur(evt) {
      window.util.removeClass(evt.target, ClassName.PIN_ACTIVE);
    }
    element.querySelector('img').src = object.author.avatar;
    element.querySelector('img').alt = object.offer.type;
    element.style.left = object.location.x + 'px';
    element.style.top = object.location.y + 'px';
    element.setAttribute('tabindex', '0');
    // добавляем обработчик события 'click' для метки
    element.addEventListener('click', function () {
      window.card.remove();
      window.card.draw(object);
    });
    // добавляем событие 'focus' для метки
    element.addEventListener('focus', onPinFocus, true);
    // добавляем событие 'blur' для метки
    element.addEventListener('blur', onPinBlur, true);

    return element;
  }
  /**
   * рисует метки объявлений
   *
   * @param {array} data массив с данными объявлений
   * @return {object} добавляем фрагмент с метками объявлений на страницу
   */
  function drawPins(data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < Math.min(data.length, QUANTITY); i++) {
      fragment.appendChild(getPin(data[i]));
    }
    return pins.appendChild(fragment);
  }
  /**
   * удаляет метки объявлений
   *
   */
  function removePins() {
    var pinsList = pins.querySelectorAll(Selector.OFFER_PINS);
    pinsList.forEach(function (it) {
      it.remove();
    });
  }

  window.pins = {
    draw: drawPins,
    remove: removePins
  };
})();
