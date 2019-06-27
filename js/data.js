'use strict';

(function () {

  var deps = {
    util: window.util // зависимости
  };

  var AD_QUANTITY = 8; // количество объявлений

  var PIN_Y_MIN = 130; // минимальная координата позиции метки по Y
  var PIN_Y_MAX = 630; // максимальная координата позиции метки по Y

  var PIN_OFFSET_X = 25; // смещение метки по X (1/2 ширины метки)
  var PIN_OFFSET_Y = 70; // смещение метки по Y (высотa метки)

  var TYPES = { // типы объявлений
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

  var map = document.querySelector('.map'); // блок с картой объявлений

  var adsData = getArrayAds(AD_QUANTITY, TYPES); // массив с данными объявлений

  /**
   * получает массив с объявлениями
   *
   * @param {number} number число объявлений
   * @param {array} typesArr массив с типами объявлений
   * @return {array} массив с объявлениями
   */
  function getArrayAds(number, typesArr) {
    var avatarNumbers = deps.util.shuffleArray(deps.util.getNumberArray(1, number));
    var arrayAds = [];

    for (var i = 0; i < number; i++) {
      var ad = {
        author: {
          avatar: 'img/avatars/user' + deps.util.addZeros(avatarNumbers[i]) + '.png'
        },
        offer: {
          type: deps.util.getRandElement(typesArr)
        },
        location: {
          x: deps.util.getRandomInt(0 + PIN_OFFSET_X, map.offsetWidth - PIN_OFFSET_X),
          y: deps.util.getRandomInt(PIN_Y_MIN + PIN_OFFSET_Y, PIN_Y_MAX - PIN_OFFSET_Y)
        }
      };
      arrayAds.push(ad);
    }
    return arrayAds;
  }

  window.data = { // экспортируем данные объявлений

    housingTypes: TYPES,

    ads: adsData,

    heightLimiters: {
      min: PIN_Y_MIN,
      max: PIN_Y_MAX
    }

  };

})();
