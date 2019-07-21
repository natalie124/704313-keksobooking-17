'use strict';
(function () {
  var Selector = {
    PINS: '.map__pins',
    PIN_TEMPLATE: '#pin',
    PIN: '.map__pin',
    OFFER_PINS: '.map__pin:not(.map__pin--main)',
    CLOSE_CARD: '.popup__close'
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

    element.querySelector('img').src = object.author.avatar;
    element.querySelector('img').alt = object.offer.type;
    element.style.left = object.location.x + 'px';
    element.style.top = object.location.y + 'px';
    element.setAttribute('tabindex', '1');


    element.addEventListener('click', function () {
      window.card.remove();
      window.card.draw(object);

      var closeButton = document.querySelector(Selector.CLOSE_CARD);

      function onEscPress(evt) {
        evt.preventDefault();
        window.util.isEscEvent(evt, window.card.remove);
        document.removeEventListener('keydown', onEscPress);
      }

      closeButton.addEventListener('click', function () {
        window.card.remove();
        document.removeEventListener('keydown', onEscPress);
      });

      document.addEventListener('keydown', onEscPress);

    });

    return element;
  }
  /**
   * рисует метки объявлений
   *
   * @param {array} data массив с данными объявлений
   * @return {object} добавляем фрагмент с метками объявлений на страницу
   */
  function drawPins(data) {

    var quantity = data.length >= QUANTITY ? QUANTITY : data.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < quantity; i++) {
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
