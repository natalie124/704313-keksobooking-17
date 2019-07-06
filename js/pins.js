'use strict';

(function () {

  var Selector = {
    PINS: '.map__pins',
    PIN_TEMPLATE: '#pin',
    PIN: '.map__pin'
  };

  var pins = document.querySelector(Selector.PINS);
  var template = document.querySelector(Selector.PIN_TEMPLATE).content.querySelector(Selector.PIN);
  /**
   * получает разметку c данными объявления
   *
   * @param {object} object объект с данными объявления
   * @return {object} готовая разметка
   */
  function getPin(object) {

    var element = template.cloneNode(true);

    element.querySelector('img').src = object.author.avatar;
    element.querySelector('img').alt = object.offer.type;
    element.style.left = object.location.x + 'px';
    element.style.top = object.location.y + 'px';

    return element;
  }

  window.pins = {
    /**
     * рисует метки объявлений
     *
     * @param {array} data массив с данными объявлений
     * @return {object} добавляем фрагмент с метками объявлений на страницу
     */
    drawPins: function (data) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {

        fragment.appendChild(getPin(data[i]));
      }

      return pins.appendChild(fragment);
    }
  };

})();
