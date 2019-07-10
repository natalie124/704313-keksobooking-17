'use strict';
(function () {
  var ALL_VALUE = 'any'; // значени фильтра "выбрать все"

  var Selector = {
    FILTER: '.map__filters',
    TYPE: '#housing-type',
    PRICE: '#housing-price',
    ROOMS: '#housing-rooms',
    GUESTS: '#housing-guests',
    ACTIVE_CHECKBOX: 'fieldset input[type="checkbox"]:checked'
  };

  var limitsToPrice = {
    low: 10000,
    high: 50000
  };

  var filterAds = document.querySelector(Selector.FILTER); // блок с фильтром
  var filterByType = filterAds.querySelector(Selector.TYPE); // блок с фильтром по типу жилья
  var filterByPrice = filterAds.querySelector(Selector.PRICE); // блок с фильтром по цене
  var filterByRooms = filterAds.querySelector(Selector.ROOMS); // блок с фильтром по количеству комнат
  var filterByGuests = filterAds.querySelector(Selector.GUESTS); // блок с фильтром по количеству гостей

  /**
   * проверяет тип жилья
   * @param {string} type название типа
   * @param {object} filter блок с фильтром (select)
   * @return {string} значение выбранного фильтра
   */
  function checkChosenType(type, filter) {
    return (type === filter.value) || (filter.value === ALL_VALUE);
  }
  /**
   * проверяет ценy
   * @param {number} price цена
   * @param {object} filter блок с фильтром (select)
   * @return {string} значение выбранного фильтра
   */
  function checkChosenPrice(price, filter) {
    switch (filter.value) {
      case 'low':
        return price < limitsToPrice.low;
      case 'middle':
        return price >= limitsToPrice.low && price <= limitsToPrice.high;
      case 'high':
        return price > limitsToPrice.high;
      default:
        return filter.value === ALL_VALUE;
    }
  }
  /**
   * проверяет комнаты или гостей
   * @param {number} roomsOrGuests количество комнат или гостей
   * @param {object} filter блок с фильтром (select)
   * @return {string} значение выбранного фильтра
   */
  function checkChosenRoomsOrGuests(roomsOrGuests, filter) {
    return (roomsOrGuests === parseInt(filter.value, 10)) || (filter.value === ALL_VALUE);
  }
  /**
   * проверяет особенности жилья
   * @param {array} features массив с названиями особенностей
   * @return {array} массив с выбранными значениями
   */
  function checkChosenFuatures(features) {
    var checkedFeatures = filterAds.querySelectorAll(Selector.ACTIVE_CHECKBOX);
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
    filterAds.addEventListener('change', function () {
      var updateAds = [];
      updateAds = data.filter(function (ad) {
        return checkChosenType(ad.offer.type, filterByType) &&
          checkChosenPrice(ad.offer.price, filterByPrice) &&
          checkChosenRoomsOrGuests(ad.offer.rooms, filterByRooms) &&
          checkChosenRoomsOrGuests(ad.offer.guests, filterByGuests) &&
          checkChosenFuatures(ad.offer.features);
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  window.onFilter = onFilter;

})();
