'use strict';

var AD_QUANTITY = 8; // количество объявлений

var PIN_Y_MIN = 130; // минимальная координата позиции метки по Y
var PIN_Y_MAX = 630; // максимальная координата позиции метки по Y
var PIN_OFFSET_X = 25; // смещение метки по X (1/2 ширины метки)
var PIN_OFFSET_Y = 70; // смещение метки по Y (высотa метки)

var map = document.querySelector('.map'); // блок с картой объявлений
var mainPin = map.querySelector('.map__pin--main'); // блок с меткой

var adForm = document.querySelector('.ad-form'); // блок с формой
var formElements = document.querySelectorAll('fieldset'); // блоки с элементами форм на странице
var address = adForm.querySelector('#address'); // поле с адресом метки
var houseType = adForm.querySelector('#type'); // поле тип жилья
var timein = adForm.querySelector('#timein'); // поле дата заезда
var timeout = adForm.querySelector('#timeout'); // поле дата выезда

var mapFilter = map.querySelector('.map__filters'); // блок с фильтром
var mapFilters = mapFilter.querySelectorAll('.map__filter'); // блоки с элементами фильтра
// данные о типах жилья
var housingTypes = {
  palace: {
    price: 10000
  },
  flat: {
    price: 1000
  },
  house: {
    price: 5000
  },
  bungalo: {
    price: 0
  }
};
/**
 * удаляет класс у элемента
 *
 * @param {object} element DOM-элемент, у которого удаляем класс
 * @param {string} className название класса, который удаляем
 */
function removeClass(element, className) {
  element.classList.remove(className);
}
/**
 * добавляет класс элементу
 *
 * @param {object} element DOM-элемент, которому добавляем класс
 * @param {string} className название класса, который добавляем
 */
function addClass(element, className) {
  element.classList.add(className);
}
/**
 * добавляет атрибут элементу
 *
 * @param {object} item DOM-элемент/ты, которому/ым добавляем атрибут
 * @param {string} name название атрибута
 * @param {string} value значение атрибута
 */
function addAttribute(item, name, value) {
  if (item.length > 0) {
    for (var i = 0; i < item.length; i++) {
      item[i].setAttribute(name, value);
    }
  }
}
/**
 * удаляет атрибут элементa
 *
 * @param {object} item DOM-элемент/ты, у которого/ых удаляем атрибут
 * @param {string} name название атрибута
 */
function removeAttribute(item, name) {
  if (item.length > 0) {
    for (var i = 0; i < item.length; i++) {
      item[i].removeAttribute(name);
    }
  }
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
 * определяет координаты элемента
 *
 * @param {object} element DOM - элемент
 * @return {string} строка с координатами элемента
 */
function getCoordinates(element) {
  return element.offsetLeft + ', ' + element.offsetTop;
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
/**
 * активирует Букинг
 *
 */
function activateBooking() {

  removeClass(map, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  removeClass(mapFilter, 'ad-form--disabled');

  removeAttribute(mapFilters, 'disabled');
  removeAttribute(formElements, 'disabled');

  drawPins(AD_QUANTITY);
}
/**
 * обработчик события mouseup (для метки)
 *
 */
function onMainPinMouseup() {
  activateBooking();
  address.value = getCoordinates(mainPin);
  mainPin.removeEventListener('mouseup', onMainPinMouseup);
}
/**
 * обработчик события change (для поля type)
 *
 * @param {object} evt объект события
 */
function onHouseTypeChange(evt) {
  var housePrice = adForm.querySelector('#price');

  housePrice.min = housingTypes[evt.target.value].price;
  housePrice.placeholder = housingTypes[evt.target.value].price;
}
/**
 * обработчик события change (для поля timein)
 *
 * @param {object} evt объект события
 */
function onTimeinChange(evt) {
  timeout.value = evt.target.value;
}
/**
 * обработчик события change (для поля timeout)
 *
 * @param {object} evt объект события
 */
function onTimeoutChange(evt) {
  timein.value = evt.target.value;
}
// скрываем фильтр
addClass(mapFilter, 'ad-form--disabled');
// добавляем атрибут disabled элементам формы
addAttribute(formElements, 'disabled', 'disabled');
addAttribute(mapFilters, 'disabled', 'disabled');
// добавляем адрес метки по умолчанию
address.value = getCoordinates(mainPin);
// добавляеи событие mouseup для метки
mainPin.addEventListener('mouseup', onMainPinMouseup);
// добавляем событие change для поля тип жилья
houseType.addEventListener('change', onHouseTypeChange);
// добавляем событие change для поля дата заезда
timein.addEventListener('change', onTimeinChange);
// добавляем событие change для поля дата выезда
timeout.addEventListener('change', onTimeoutChange);
