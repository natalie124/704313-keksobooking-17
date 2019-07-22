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
      if (evt.keyCode === Code.ESC) {
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
      if (evt.keyCode === Code.ENTER) {
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
    },
    /**
     * возвращает корректную форму множественного числа
     * ограничения: только для целых чисел
     *
     * @param {number} number число, по которому вычисляем форму множественного числа
     * @param {string} one форма единственного числа: яблоко, час, минута
     * @param {string} two форма множественного числа для 2, 3, 4: яблока, часа, минуты
     * @param {string} many форма множественного числа для остальных чисел
     *
     * @return {string} рассчитанная форма множественнго числа
     */
    getNounPluralForm: function (number, one, two, many) {
      var mod10 = number % 10;
      var mod100 = number % 100;
      switch (true) {
        case (mod100 >= 11 && mod100 <= 20):
          return many;
        case (mod10 > 5):
          return many;
        case (mod10 === 1):
          return one;
        case (mod10 >= 2 && mod10 <= 4):
          return two;
        default:
          return many;
      }
    }
  };
})();
