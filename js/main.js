'use strict';

var AD_QUANTITY = 8; // количество объявлений
var PIN_Y_MIN = 130; // минимальная координата позиции метки по Y
var PIN_Y_MAX = 630; // максимальная координата позиции метки по Y
var PIN_OFFSET_X = 25; // смещение метки по X (1/2 ширины метки)
var PIN_OFFSET_Y = 35; // смещение метки по Y (1/2 высоты метки)
var map = document.querySelector('.map'); // блок с картой объявлений

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


  var pins = map.querySelector('.map__pins');
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
        author: {
          avatar: 'img/avatars/user' + addZeros(avatarNumbers[i]) + '.png'
        },
        offer: {
          type: getRandElement(housingTypes)
        },
        location: {
          x: getRandomInt(0 + PIN_OFFSET_X, map.offsetWidth - PIN_OFFSET_X),
          y: getRandomInt(PIN_Y_MIN + PIN_OFFSET_Y, PIN_Y_MAX - PIN_OFFSET_Y)
        }
      };
      arrayAds.push(ad);
    }
    return arrayAds;
  }
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

  for (var i = 0; i < quantity; i++) {

    fragment.appendChild(getPin(ads[i]));
  }

  return pins.appendChild(fragment);
}

drawPins(AD_QUANTITY); // рисуем объявления на странице
removeClass(map, 'map--faded'); // показываем блок с объявлениями на странице