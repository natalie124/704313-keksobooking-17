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
  var map = document.querySelector(Selector.MAP); // блок с картой объявлений
  var mainPin = map.querySelector(Selector.MAIN_PIN); // блок с меткой
  var form = document.querySelector(Selector.FORM); // блок с формой
  var address = form.querySelector(Selector.ADDRESS); // поле с адресом метки
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
      var mainPinLeft = mainPin.offsetLeft;
      var mainPinTop = mainPin.offsetTop;
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
      if (mainPinLeft < 0) {
        mainPinLeft = 0;
      }
      if (mainPinLeft > map.offsetWidth - mainPin.offsetWidth) {
        mainPinLeft = map.offsetWidth - mainPin.offsetWidth;
      }
      if (mainPin.offsetTop < PIN_Y_MIN - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MIN - mainPin.offsetHeight;
      }
      if (mainPinTop > PIN_Y_MAX - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MAX - mainPin.offsetHeight;
      }
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

  function onMainPinKeydown(evt) {
    evt.preventDefault();

    var mainPinLeft = mainPin.offsetLeft;
    var mainPinTop = mainPin.offsetTop;

    if (evt.target === mainPin) {
      if (evt.keyCode === 39) {
        mainPinLeft += 5;
      }
      if (evt.keyCode === 37) {
        mainPinLeft -= 5;
      }
      if (evt.keyCode === 40) {
        mainPinTop += 5;
      }
      if (evt.keyCode === 38) {
        mainPinTop -= 5;
      }
      if (mainPinLeft < 0) {
        mainPinLeft = 0;
      }
      if (mainPinLeft > map.offsetWidth - mainPin.offsetWidth) {
        mainPinLeft = map.offsetWidth - mainPin.offsetWidth;
      }
      if (mainPin.offsetTop < PIN_Y_MIN - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MIN - mainPin.offsetHeight;
      }
      if (mainPinTop > PIN_Y_MAX - mainPin.offsetHeight) {
        mainPinTop = PIN_Y_MAX - mainPin.offsetHeight;
      }
      if (map.classList.contains(ClassName.MAP_FADED)) {
        window.map.activate();
      }

      mainPin.style.left = mainPinLeft + 'px';
      mainPin.style.top = mainPinTop + 'px';
    }
  }

  function onMainPinTabPress(evt) {
    if (evt.keyCode === 9 && evt.target === mainPin) {
      mainPin.blur();
      mainPin.removeEventListener('keydown', onMainPinTabPress);
    }
  }
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onMainPinKeydown);
  mainPin.addEventListener('keydown', onMainPinTabPress);
})();
