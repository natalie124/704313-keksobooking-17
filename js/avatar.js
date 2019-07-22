'use strict';
(function () {
  var ClassName = {
    FORM_DISABLED: 'ad-form--disabled'
  };
  var Selector = {
    FORM: '.ad-form',

    AVATAR: '#avatar',
    AVATAR_PREVIEW: '.ad-form-header__preview img',
    AVATAR_DROP_ZONE: '.ad-form-header__drop-zone',
  };
  var FontColor = {
    FOCUS: '#ff5635',
    BLUR: '#999999'
  };
  var DragAndDropStyle = {
    DRAGOVER_BACKGROUND: '#dadada',
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var form = document.querySelector(Selector.FORM);
  var avatarChooser = form.querySelector(Selector.AVATAR);
  var avatarPreview = form.querySelector(Selector.AVATAR_PREVIEW);
  var avatarDropZone = form.querySelector(Selector.AVATAR_DROP_ZONE);
  /**
   * добавляет загруженный в форму аватар на страницу
   *
   * @param {object} file объект с картинкой аватара
   *
   */
  function addAvatar(file) {

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches && !form.classList.contains(ClassName.FORM_DISABLED)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }
  /**
   * сбрасывает аватар на дефолтный
   *
   *
   */
  function resetAvatar() {
    avatarPreview.src = DEFAULT_AVATAR;
  }
  // добавляет собитие 'change' для поля загрузки аватара
  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    addAvatar(file);
  });
  // добавляет собитие 'focus' для поля загрузки аватара
  avatarChooser.addEventListener('focus', function () {
    avatarDropZone.style.color = FontColor.FOCUS;
  });
  // добавляет собитие 'blur' для поля загрузки аватара
  avatarChooser.addEventListener('blur', function () {
    avatarDropZone.style.color = FontColor.BLUR;
  });
  // добавляет собитие 'dragover' для дропзоны аватара
  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    avatarDropZone.style.backgroundColor = DragAndDropStyle.DRAGOVER_BACKGROUND;
  }, false);
  // добавляет собитие 'dragleave' для дропзоны аватара
  avatarDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    avatarDropZone.style.backgroundColor = '';
  }, false);
  // добавляет собитие 'drop' для дропзоны аватара
  avatarDropZone.addEventListener('drop', function (evt) {
    var file = evt.dataTransfer.files[0];
    avatarDropZone.style.backgroundColor = '';
    evt.stopPropagation();
    evt.preventDefault();
    addAvatar(file);
  }, false);

  window.avatar = {
    reset: resetAvatar
  };

})();
