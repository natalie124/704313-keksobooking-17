'use strict';

(function () {

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
     * @param {string} name название атрибута
     * @param {string} value значение атрибута
     */
    addAttribute: function (item, name, value) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          item[i].setAttribute(name, value);
        }
      }
    },
    /**
     * удаляет атрибут элементa
     *
     * @param {object} item DOM-элемент/ты, у которого/ых удаляем атрибут
     * @param {string} name название атрибута
     */
    removeAttribute: function (item, name) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          item[i].removeAttribute(name);
        }
      }
    },
    /**
     * получает рандомное число в диапазоне
     *
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {number} случайное число в пределах диапазона
     */
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * добавляет '0' к числу в пределах от 1 до 9
     *
     * @param {number} number число
     * @return {string} число в виде строки с ведущим нулем в пределах от 01 до 09 либо число в виде строки
     */
    addZeros: function (number) {
      return Number.isInteger(number) && number < 10 && number > 0 ? '0' + number : String(number);
    },
    /**
     * получает массив с числами в диапазоне
     *
     * @param {number} min минимальное значение
     * @param {number} max максимальное значение
     * @return {array} массив
     */
    getNumberArray: function (min, max) {
      var array = [];
      for (var i = min; i <= max; i++) {
        array.push(i);
      }
      return array;
    },
    /**
     * перемешивает массив случайным образом
     *
     * @param {array} array массив
     * @return {array} массив
     */
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    /**
     * получает случайный элемент
     *
     * @param {array} array массив
     * @return {string} or {number} or {object} or {array} случайный элемент массива
     */
    getRandElement: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
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
    }
  };

})();
