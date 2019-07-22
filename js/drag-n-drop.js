'use strict';
(function () {
  var PIN_Y_MIN = 130; // минимальная координата позиции метки по Y
  var PIN_Y_MAX = 630; // максимальная координата позиции метки по Y
  var ClassName = {
    MAP_FADED: 'map--faded'
  };
  var Selector = {
    MAP: '.map',
    MAIN_PIN: '.map__pin--main',

    FORM: '.ad-form',
    ADDRESS: '#address'
  };
  var code = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    W: 88,
    D: 68,
    S: 83
  };
  var MOVE_STEP = 5;

  var map = document.querySelector(Selector.MAP); // блок с картой объявлений
  var mainPin = map.querySelector(Selector.MAIN_PIN); // блок с меткой
  var form = document.querySelector(Selector.FORM); // блок с формой
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки

  function checkPinPosition() {
    var pinLeft = mainPin.offsetLeft;
    var pinTop = mainPin.offsetTop;
    var pinWidth = mainPin.offsetWidth;
    var pinHeight = mainPin.offsetHeight;
    var mapWidth = map.offsetWidth;
    var coords = {};

    if (pinLeft < 0) {
      pinLeft = 0;
    }
    if (pinLeft > mapWidth - pinWidth) {
      pinLeft = mapWidth - pinWidth;
    }
    if (mainPin.offsetTop < PIN_Y_MIN - pinHeight) {
      pinTop = PIN_Y_MIN - pinHeight;
    }
    if (pinTop > PIN_Y_MAX - pinHeight) {
      pinTop = PIN_Y_MAX - pinHeight;
    }
    coords.left = pinLeft;
    coords.top = pinTop;
    return coords;
  }
  /**
   * обработчик события mousedown (для метки)
   * @param {object} evt объект события
   *
   */
  function onMainPinMouseDown(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    /**
     * обработчик события mousemove (для метки)
     * @param {object} moveEvt объект события
     *
     */
    function onMouseMove(moveEvt) {
      var newCoords = checkPinPosition();
      var mainPinLeft = newCoords.left;
      var mainPinTop = newCoords.top;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      moveEvt.preventDefault();
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mainPinTop = (mainPinTop - shift.y);
      mainPinLeft = (mainPinLeft - shift.x);

      mainPin.style.left = mainPinLeft + 'px';
      mainPin.style.top = mainPinTop + 'px';
    }
    /**
     * обработчик события mouseup (для метки)
     * @param {object} upEvt объект события
     *
     */
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      address.value = window.util.getCoordinates(mainPin, mainPin.offsetWidth / 2, mainPin.offsetHeight);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    evt.preventDefault();
    if (map.classList.contains(ClassName.MAP_FADED)) {
      window.map.activate();
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  /**
   * обработчик события keydown (для метки)
   * @param {object} evt объект события
   *
   */
  function onMainPinKeydown(evt) {
    var newCoords = checkPinPosition();
    var mainPinLeft = newCoords.left;
    var mainPinTop = newCoords.top;
    var keyCode = evt.keyCode;

    evt.preventDefault();

    if (evt.target === mainPin) {
      if (keyCode === code.LEFT || keyCode === code.A) {
        mainPinLeft -= MOVE_STEP;
      }
      if (keyCode === code.RIGHT || keyCode === code.D) {
        mainPinLeft += MOVE_STEP;
      }
      if (keyCode === code.UP || keyCode === code.W) {
        mainPinTop -= MOVE_STEP;
      }
      if (keyCode === code.DOWN || keyCode === code.S) {
        mainPinTop += MOVE_STEP;
      }

      if (map.classList.contains(ClassName.MAP_FADED)) {
        window.map.activate();
      }
      mainPin.style.left = mainPinLeft + 'px';
      mainPin.style.top = mainPinTop + 'px';
      address.value = window.util.getCoordinates(mainPin, mainPin.offsetWidth / 2, mainPin.offsetHeight);
    }
  }
  /**
   * обработчик события tab press (для метки)
   * @param {object} evt объект события
   *
   */
  function onMainPinTabPress(evt) {
    if (evt.keyCode === 9 && evt.target === mainPin) {
      mainPin.blur();
    }
  }
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinKeydown);
  mainPin.addEventListener('keydown', onMainPinTabPress);

})();
