'use strict';
(function () {
  var ClassName = {
    FORM_DISABLED: 'ad-form--disabled'
  };

  var Selector = {
    FORM: '.ad-form',

    PHOTOS: '#images',
    PHOTOS_DROP_ZONE: '.ad-form__drop-zone',
    PHOTO_PREVIEW: '.ad-form__photo',
    PHOTOS_CONTAINER: '.ad-form__photo-container'
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var dataOnPhotos = {
    width: '70',
    height: '70',
    alt: 'Фотография жилья'
  };

  var form = document.querySelector(Selector.FORM);

  var photosChooser = form.querySelector(Selector.PHOTOS);
  var photosDropZone = form.querySelector(Selector.PHOTOS_DROP_ZONE);
  var photoContainer = form.querySelector(Selector.PHOTOS_CONTAINER);
  var photoPreview = photoContainer.querySelector(Selector.PHOTO_PREVIEW);

  function createPhoto(dataUrl) {
    var preview = photoPreview.cloneNode();
    var photo = document.createElement('img');
    photo.width = dataOnPhotos.width;
    photo.height = dataOnPhotos.height;
    photo.alt = dataOnPhotos.alt;
    photo.src = dataUrl;
    preview.appendChild(photo);

    return preview;
  }

  function addPhotos(files) {

    Array.from(files).forEach(function (file) {

      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {

        return fileName.endsWith(it);
      });
      if (matches && !form.classList.contains(ClassName.FORM_DISABLED)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photoContainer.insertBefore(createPhoto(reader.result), photoPreview);
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function removePhotos() {
    var photosList = photoContainer.querySelectorAll(Selector.PHOTO_PREVIEW);
    for (var i = 0; i < photosList.length - 1 && photosList.length > 1; i++) {
      photosList[i].remove();
    }
  }

  photosChooser.addEventListener('change', function () {
    var files = photosChooser.files;

    addPhotos(files);
  }, false);

  photosDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    photosDropZone.style.backgroundColor = '#dadada';
  }, false);

  photosDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    photosDropZone.style.backgroundColor = '';
  }, false);

  photosDropZone.addEventListener('drop', function (evt) {
    var files = evt.dataTransfer.files;

    photosDropZone.style.backgroundColor = '';
    evt.stopPropagation();
    evt.preventDefault();
    addPhotos(files);
  }, false);

  window.photos = {
    remove: removePhotos
  };

})();
