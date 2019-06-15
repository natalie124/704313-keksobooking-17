'use strict';

var map = document.querySelector('.map'); // блок с картой объявлений
var AD_QUANTITY = 8; // количество объявлений

/**
 * удаляет класс у элемента
 *
 * @param {object} element DOM-элемент, у которого удаляем класс
 * @param {string} className название класса, который удаляем
 * @return {object} элемент
 */
function removeClass(element, className) {
  return element.classList.remove(className);
}
/**
 * получает рандомное число в диапазоне
 *
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number} случайное число в пределах диапазона
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * добавляет '0' к числу в пределах от 1 до 9
 *
 * @param {number} number число
 * @return {string} число в виде строки с ведущим нулем в пределах от 01 до 09 либо число в виде строки
 */
function addZeros(number) {
  return Number.isInteger(number) && number < 10 && number > 0 ? '0' + number : String(number);
}
/**
 * получает массив с числами в диапазоне
 *
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {array} массив
 */
function getNumberArray(min, max) {
  var array = [];

  for (var i = min; i <= max; i++) {
    array.push(i);
  }

  return array;
}
/**
 * перемешивает массив случайным образом
 *
 * @param {array} array массив
 * @return {array} массив
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
/**
 * получает случайный элемент
 *
 * @param {array} array массив
 * @return {string} or {number} or {object} or {array} случайный элемент массива
 */
function getRandElement(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}
/**
 * рисует метки объявлений
 *
 * @param {number} quantity количество объявлений
 * @return {object} добавляем фрагмент с метками объявлений на страницу
 */
function drawPins(quantity) {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = map.querySelector('.map__pins');
  var pin = pins.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var ads = getArrayAds(quantity);
  /**
 * получает массив с объявлениями
 *
 * @param {number} number число объявлений
 * @return {array} массив с объявлениями
 */
  function getArrayAds(number) {

    var avatarNumbers = shuffleArray(getNumberArray(1, quantity));
    var housingTypes = [
      'palace',
      'flat',
      'house',
      'bungalo'
    ];

    var arrayAds = [];

    for (var i = 0; i < number; i++) {
      var ad = {
        author: 'img/avatars/user' + addZeros(avatarNumbers[i]) + '.png',
        offer: getRandElement(housingTypes),
        location: {
          x: getRandomInt(0 + pin.offsetWidth / 2, map.offsetWidth - pin.offsetWidth / 2),
          y: getRandomInt(130 + pin.offsetHeight / 2, 630 - pin.offsetHeight / 2)
        }
      };
      arrayAds.push(ad);
    }
    return arrayAds;
  }

  for (var i = 0; i < quantity; i++) {

    var element = pinTemplate.cloneNode(true);
    element.querySelector('img').src = ads[i].author;
    element.querySelector('img').alt = ads[i].offer;
    element.style.left = ads[i].location.x + 'px';
    element.style.top = ads[i].location.y + 'px';
    fragment.appendChild(element);
  }

  return pins.appendChild(fragment);
}

drawPins(AD_QUANTITY); // рисуем объявления на странице
removeClass(map, 'map--faded'); // показываем блок с объявлениями на странице
