'use strict';

(function () {
  /**
   * получает разметку c данными объявления
   *
   * @param {object} object объект с данными объявления
   * @return {object} готовая разметка
   */
  function getPin(object) {

    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = pinTemplate.cloneNode(true);

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
     * @param {number} quantity количество объявлений
     * @param {array} dataArr массив с данными объявлений
     * @return {object} добавляем фрагмент с метками объявлений на страницу
     */
    drawPins: function (quantity, dataArr) {
      var pins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < quantity; i++) {

        fragment.appendChild(getPin(dataArr[i]));
      }

      return pins.appendChild(fragment);
    }
  };

})();
