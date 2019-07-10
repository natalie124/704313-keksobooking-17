'use strict';

(function () {

  var Code = {
    ENTER: 13,
    ESC: 27
  };

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout = null;

  window.util = {
    /**
     * удаляет класс у элемента
     *
     * @param {object} element DOM-элемент, у которого удаляем класс
     * @param {string} className название класса, который удаляем
     */
    removeClass: function (element, className) {
      element.classList.remove(className);
    },
    /**
     * добавляет класс элементу
     *
     * @param {object} element DOM-элемент, которому добавляем класс
     * @param {string} className название класса, который добавляем
     */
    addClass: function (element, className) {
      element.classList.add(className);
    },
    /**
     * добавляет атрибут элементу
     *
     * @param {object} item DOM-элемент/ты, которому/ым добавляем атрибут
     */
    addDisabled: function (item) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          item[i].disabled = true;
        }
      }
    },
    /**
     * удаляет атрибут элементa
     *
     * @param {object} item DOM-элемент/ты, у которого/ых удаляем атрибут
     */
    removeDisabled: function (item) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          item[i].disabled = false;
        }
      }
    },
    /**
     * определяет координаты элемента
     *
     * @param {object} element DOM - элемент
     * @param {number} offsetLeft - смещение координаты по оси X
     * @param {number} offsetTop - смещение координаты по оси Y
     * @return {string} строка с координатами элемента
     */
    getCoordinates: function (element, offsetLeft, offsetTop) {
      return Math.round(element.offsetLeft + offsetLeft) + ', ' + Math.round(element.offsetTop + offsetTop);
    },
    /**
     * обрабатывает событие при нажатии  Esc
     *
     * @param {object} evt объект события
     * @param {function}  action действие, когда событие сработает
     */
    isEscEvent: function (evt, action) {
      if (evt.Code === Code.ESC) {
        action();
      }
    },
    /**
     * обрабатывает событие при нажатии  Enter
     *
     * @param {object} evt объект события
     * @param {function}  action действие, когда событие сработает
     */
    isEnterEvent: function (evt, action) {
      if (evt.Code === Code.ENTER) {
        action();
      }
    },
    /**
     * возвращает обертку, которая откладывает вызов исходной функции на определенное время
     *
     * @param {function} cb функция обертка с исходной функцией
     */
    debounce: function (cb) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };

})();
