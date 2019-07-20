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


  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var form = document.querySelector(Selector.FORM);

  var avatarChooser = form.querySelector(Selector.AVATAR);
  var avatarPreview = form.querySelector(Selector.AVATAR_PREVIEW);
  var avatarDropZone = form.querySelector(Selector.AVATAR_DROP_ZONE);


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

  function resetAvatar() {
    avatarPreview.src = DEFAULT_AVATAR;
  }

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    addAvatar(file);
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    avatarDropZone.style.backgroundColor = '#dadada';
  }, false);

  avatarDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    avatarDropZone.style.backgroundColor = '';
  }, false);

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
