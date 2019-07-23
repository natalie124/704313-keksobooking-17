'use strict';
(function () {
  var ClassName = {
    MAP_FADED: 'map--faded'
  };
  var Selector = {
    MAP: '.map',
    MAIN_PIN: '.map__pin--main',
    FORM: '.ad-form',
    ADDRESS: '#address'
  };
  var PinData = {
    Y_MIN: 130,
    Y_MAX: 630,
    WIDTH: 65,
    HEIGHT: 65,
    MOVE_STEP: 10
  };
  var code = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    W: 87,
    D: 68,
    S: 83,
    TAB: 9
  };
  var map = document.querySelector(Selector.MAP); // блок с картой объявлений
  var mainPin = map.querySelector(Selector.MAIN_PIN); // блок с меткой
  var form = document.querySelector(Selector.FORM); // блок с формой
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки
  /**
   * проверяет позицию метки на карте
   *
   * @return {object} объект с координатами метки
   */
  function checkPinPosition() {
    var pinX = mainPin.offsetLeft;
    var pinY = mainPin.offsetTop;
    var mapWidth = map.offsetWidth;
    var coords = {};

    if (pinX < 0) {
      pinX = 0;
    }
    if (pinX > mapWidth - PinData.WIDTH) {
      pinX = mapWidth - PinData.WIDTH;
    }
    if (pinY < PinData.Y_MIN - PinData.HEIGHT) {
      pinY = PinData.Y_MIN - PinData.HEIGHT;
    }
    if (pinY > PinData.Y_MAX - PinData.HEIGHT) {
      pinY = PinData.Y_MAX - PinData.HEIGHT;
    }
    coords.left = pinX;
    coords.top = pinY;
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
      var pinX = newCoords.left;
      var pinY = newCoords.top;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      moveEvt.preventDefault();
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pinY = (pinY - shift.y);
      pinX = (pinX - shift.x);

      mainPin.style.left = pinX + 'px';
      mainPin.style.top = pinY + 'px';
    }
    /**
     * обработчик события mouseup (для метки)
     * @param {object} upEvt объект события
     *
     */
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      address.value = window.util.getCoordinates(mainPin, PinData.WIDTH / 2, PinData.HEIGHT);
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
    var pinX = newCoords.left;
    var pinY = newCoords.top;
    var keyCode = evt.keyCode;

    evt.preventDefault();

    if (evt.target === mainPin) {
      if (keyCode === code.LEFT || keyCode === code.A) {
        pinX -= PinData.MOVE_STEP;
      }
      if (keyCode === code.RIGHT || keyCode === code.D) {
        pinX += PinData.MOVE_STEP;
      }
      if ((keyCode === code.UP || keyCode === code.W) && (pinY + PinData.HEIGHT) > PinData.Y_MIN) {
        pinY -= PinData.MOVE_STEP;
      }
      if ((keyCode === code.DOWN || keyCode === code.S) && (pinY + PinData.HEIGHT) < PinData.Y_MAX) {
        pinY += PinData.MOVE_STEP;
      }

      if (map.classList.contains(ClassName.MAP_FADED)) {
        window.map.activate();
      }
      mainPin.style.left = pinX + 'px';
      mainPin.style.top = pinY + 'px';
      address.value = window.util.getCoordinates(mainPin, PinData.WIDTH / 2, PinData.HEIGHT);
    }
  }
  /**
   * обработчик события tab press (для метки)
   * @param {object} evt объект события
   *
   */
  function onMainPinTabPress(evt) {
    if (evt.keyCode === code.TAB && evt.target === mainPin) {
      mainPin.blur();
    }
  }
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinKeydown);
  mainPin.addEventListener('keydown', onMainPinTabPress);
})();
