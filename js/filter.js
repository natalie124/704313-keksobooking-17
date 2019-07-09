'use strict';
(function () {
  var Selector = {

    FILTER: '.map__filters',
    TYPE: '#housing-type',
    PRICE: '#housing-price',
    ROOMS: '#housing-rooms',
    GUESTS: '#housing-guests',
    FUATURES: '#housing-features',
    ACTIVE_CHECKBOX: 'fieldset input[type="checkbox"]:checked'
  };

  var limitsToPrice = {
    low: 10000,
    high: 50000
  };

  var ANY_VALUE = 'any';

  var filter = document.querySelector(Selector.FILTER); // блок с фильтром

  var type = filter.querySelector(Selector.TYPE);
  var price = filter.querySelector(Selector.PRICE);
  var rooms = filter.querySelector(Selector.ROOMS);
  var guests = filter.querySelector(Selector.GUESTS);
  var features = filter.querySelector(Selector.FUATURES);

  function onTypeChange() {

    type.addEventListener('change', function (evt) {
      var updateAds = [];
      updateAds = window.ads.filter(function (ad) {
        switch (evt.target.value) {
          case ANY_VALUE:
            return ad;
          case evt.target.value:
            return ad.offer.type === evt.target.value;
          default:
            return ad;
        }
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  function onPriceChange() {

    price.addEventListener('change', function (evt) {
      var updateAds = [];
      updateAds = window.ads.filter(function (ad) {
        switch (evt.target.value) {
          case ANY_VALUE:
            return ad;
          case 'low':
            return ad.offer.price < limitsToPrice.low;
          case 'high':
            return ad.offer.price > limitsToPrice.high;
          case 'middle':
            return ad.offer.price >= limitsToPrice.low && ad.offer.price <= limitsToPrice.high;
          default:
            return updateAds;
        }
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  function onRoomsChange() {

    rooms.addEventListener('change', function (evt) {
      var updateAds = [];
      updateAds = window.ads.filter(function (ad) {
        switch (evt.target.value) {
          case ANY_VALUE:
            return ad;
          case evt.target.value:
            return ad.offer.rooms === parseInt(evt.target.value, 10);
          default:
            return ad;
        }
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  function onGuestsChange() {

    guests.addEventListener('change', function (evt) {
      var updateAds = [];
      updateAds = window.ads.filter(function (ad) {
        switch (evt.target.value) {
          case ANY_VALUE:
            return ad;
          case evt.target.value:
            return ad.offer.guests === parseInt(evt.target.value, 10);
          default:
            return ad;
        }
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    });
  }

  function onFuaturesChecked() {
    function onFuatures() {
      var updateAds = [];
      var checkedFeatures = filter.querySelectorAll(Selector.ACTIVE_CHECKBOX);
      checkedFeatures.forEach(function (checkedFeature) {
        updateAds = window.ads.filter(function (ad) {
          return ad.offer.features.includes(checkedFeature.value);
        });
      });
      window.util.debounce(function () {
        window.pins.remove();
        window.pins.draw(updateAds);
      });
    }
    features.addEventListener('change', onFuatures);
  }

  window.filter = {
    type: onTypeChange,
    price: onPriceChange,
    rooms: onRoomsChange,
    guests: onGuestsChange,
    features: onFuaturesChecked
  };
})();
