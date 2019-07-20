'use strict';
(function () {
  var ALL_VALUE = 'any'; // значени фильтра "выбрать все"
  var Selector = {
    FILTER: '.map__filters',
    TYPE: '#housing-type',
    PRICE: '#housing-price',
    ROOMS: '#housing-rooms',
    GUESTS: '#housing-guests',
    ACTIVE_CHECKBOX: 'input[name="features"]:checked',
  };
  var limitsToPrice = {
    low: 10000,
    high: 50000
  };
  var filter = document.querySelector(Selector.FILTER); // блок с фильтром
  var filterByType = filter.querySelector(Selector.TYPE); // блок с фильтром по типу жилья
  var filterByPrice = filter.querySelector(Selector.PRICE); // блок с фильтром по цене
  var filterByRooms = filter.querySelector(Selector.ROOMS); // блок с фильтром по количеству комнат
  var filterByGuests = filter.querySelector(Selector.GUESTS); // блок с фильтром по количеству гостей
  /**
   * проверяет тип жилья
   * @param {string} type название типа
   * @param {string} value значение фильтра
   * @return {string} значение выбранного фильтра
   */
  function checkChosenType(type, value) {
    return (type === value) || (value === ALL_VALUE);
  }
  /**
   * проверяет ценy
   * @param {number} price цена
   * @param {string} value значение фильтра
   * @return {string} значение выбранного фильтра
   */
  function checkChosenPrice(price, value) {
    switch (value) {
      case 'low':
        return price < limitsToPrice.low;
      case 'middle':
        return price >= limitsToPrice.low && price <= limitsToPrice.high;
      case 'high':
        return price > limitsToPrice.high;
      default:
        return value === ALL_VALUE;
    }
  }
  /**
   * проверяет комнаты или гостей
   * @param {number} roomsOrGuests количество комнат или гостей
   * @param {string} value значение фильтра
   * @return {string} значение выбранного фильтра
   */
  function checkChosenRoomsOrGuests(roomsOrGuests, value) {
    return (roomsOrGuests === parseInt(value, 10)) || (value === ALL_VALUE);
  }
  /**
   * проверяет особенности жилья
   * @param {array} features массив с названиями особенностей
   * @return {array} массив с выбранными значениями
   */
  function checkChosenFuatures(features) {
    var checkedFeatures = filter.querySelectorAll(Selector.ACTIVE_CHECKBOX);
    return Array.from(checkedFeatures).every(function (feature) {
      return features.includes(feature.value);
    });
  }
  /**
   * рисует пины, соответствующие выбранным фильтрам
   * @param {array} data массив c данными для фильтрации
   *
   */
  function onFilter(data) {
    filter.addEventListener('change', function () {
      var updateAds = [];
      updateAds = data.filter(function (ad) {
        return checkChosenType(ad.offer.type, filterByType.value) &&
          checkChosenPrice(ad.offer.price, filterByPrice.value) &&
          checkChosenRoomsOrGuests(ad.offer.rooms, filterByRooms.value) &&
          checkChosenRoomsOrGuests(ad.offer.guests, filterByGuests.value) &&
          checkChosenFuatures(ad.offer.features);
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.card.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  window.onFilter = onFilter;
})();
