'use strict';
(function () {
  var Selector = {
    MAP: '.map',
    CARD_TEMPLATE: '#card',
    CARD: '.map__card',
    CARD_LOCATION: '.map__filters-container',
    CLOSE_CARD: '.popup__close',

    AVATAR: '.popup__avatar',
    TITLE: '.popup__title',
    ADDRESS: '.popup__text--address',
    PRICE: '.popup__text--price',
    TYPE: '.popup__type',
    CAPACITY: '.popup__text--capacity',
    TIME: '.popup__text--time',
    FEATURES: '.popup__features',
    DESCRIPTION: '.popup__description',
    PHOTOS: '.popup__photos',
    PHOTO: '.popup__photo'
  };
  var optionsToHousingTypes = { // типы объявлений
    palace: {
      price: 10000,
      name: 'Дворец'
    },
    flat: {
      price: 1000,
      name: 'Квартира'
    },
    house: {
      price: 5000,
      name: 'Дом'
    },
    bungalo: {
      price: 0,
      name: 'Бунгало'
    }
  };
  var featuresToTitle = {
    wifi: 'Wi-Fi',
    dishwasher: 'Посудомоечная машина',
    parking: 'Парковка',
    washer: 'Cтиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер'
  };
  var map = document.querySelector(Selector.MAP);
  /**
   * добавляет событие esc
   * @param {object} evt объект события
   *
   */
  function onEscPress(evt) {
    evt.preventDefault();
    window.util.isEscEvent(evt, removeCard);
  }
  /**
   * получает описание вместимости жилья
   *
   * @param {number} rooms количество комнат
   * @param {number} guests количество гостей
   * @return {string} информация о вместимости
   */
  function getCapacityDescription(rooms, guests) {
    var description = '';
    if (rooms < 1) {
      description = 'Комнат нет';
    } else if (rooms > 0 && guests < 1) {
      description = rooms + window.util.getNounPluralForm(rooms, ' комната', ' комнаты', ' комнат') + ' не для гостей.';
    } else {
      description = rooms + window.util.getNounPluralForm(rooms, ' комната', ' комнаты', ' комнат') + ' для '
      + guests + window.util.getNounPluralForm(guests, ' гостя.', ' гостей.', ' гостей.');
    }
    return description;
  }
  /**
   * получает разметку со списком удобств жилья и рисует ее в узел с картой
   *
   * @param {array} array список удобств
   * @param {object} node узел для отрисовки
   *
   */
  function getFeaturesList(array, node) {
    var features = node.querySelector(Selector.FEATURES);
    var fragment = document.createDocumentFragment();
    features.innerHTML = '';
    if (array.length === 0) {
      features.remove();
    }
    array.forEach(function (it) {
      var item = document.createElement('li');
      item.className = 'popup__feature popup__feature--' + it;
      item.title = featuresToTitle[it];

      fragment.appendChild(item);
    });
    features.appendChild(fragment);
  }
  /**
   * получает разметку со списком фотографий жилья и рисует ее в узел с картой
   *
   * @param {array} array список фотографий
   * @param {object} node узел для отрисовки
   *
   */
  function getPhotosList(array, node) {
    var photos = node.querySelector(Selector.PHOTOS);
    var photo = photos.querySelector(Selector.PHOTO);
    var fragment = document.createDocumentFragment();

    photos.innerHTML = '';
    if (array.length === 0) {
      photos.remove();
    }
    array.forEach(function (it) {
      var item = photo.cloneNode(true);
      item.src = it;

      fragment.appendChild(item);
    });
    photos.appendChild(fragment);
  }
  /**
   * получает разметку c данными карты и рисует ее в DOM
   *
   * @param {object} object объект с данными объявления
   *
   */
  function drawCard(object) {
    var template = document.querySelector(Selector.CARD_TEMPLATE).content.querySelector(Selector.CARD);
    var location = document.querySelector(Selector.CARD_LOCATION);
    var element = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var closeButton = element.querySelector(Selector.CLOSE_CARD);

    element.querySelector(Selector.AVATAR).src = object.author.avatar;
    element.querySelector(Selector.TITLE).textContent = object.offer.title;
    element.querySelector(Selector.ADDRESS).textContent = object.offer.address;
    element.querySelector(Selector.PRICE).textContent = object.offer.price + ' ₽/ночь';
    element.querySelector(Selector.TYPE).textContent = optionsToHousingTypes[object.offer.type].name;
    element.querySelector(Selector.CAPACITY).textContent = getCapacityDescription(object.offer.rooms, object.offer.guests);
    element.querySelector(Selector.TIME).textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';
    getFeaturesList(object.offer.features, element);
    element.querySelector(Selector.DESCRIPTION).textContent = object.offer.description;
    getPhotosList(object.offer.photos, element);
    // добавляем событие keydown при отрисовке карты (закрывает карту при нажатии esc)
    document.addEventListener('keydown', onEscPress);
    // добавляем событие click при отрисовке карты (закрывает карту при нажатии esc)
    closeButton.addEventListener('click', removeCard);

    fragment.appendChild(element);
    map.insertBefore(fragment, location);
  }
  /**
   * удаляет разметку с картой из DOM
   *
   */
  function removeCard() {
    var card = map.querySelector(Selector.CARD);
    if (card !== null) {
      card.remove();
    }
    // удаляем событие keydown при закрытии карты
    document.removeEventListener('keydown', onEscPress);
  }
  window.card = {
    remove: removeCard,
    draw: drawCard,
    types: optionsToHousingTypes
  };
})();
