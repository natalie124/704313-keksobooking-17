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
  var PhotoData = {
    WIDTH: '70',
    HEIGHT: '70',
    ALT: 'Фотография жилья'
  };
  var DragAndDropStyle = {
    PHOTOS_DRAGOVER_BACKGROUND: '#dadada',
    PHOTO_DRAGOVER_OPACITY: '0.5',
    PHOTO_DRAGOVER_TRANSITION: '0.3s'
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var form = document.querySelector(Selector.FORM); // форма подачи объявления
  var photosChooser = form.querySelector(Selector.PHOTOS); // поле для загрузки фотографий
  var photosDropZone = form.querySelector(Selector.PHOTOS_DROP_ZONE); // дропзона для загрузки фотографий
  var photoContainer = form.querySelector(Selector.PHOTOS_CONTAINER); // блок с фотографиями
  var photoPreview = photoContainer.querySelector(Selector.PHOTO_PREVIEW); // контейнер для одной фотографии
  /**
   * создает разметку фотографии
   *
   * @param {string} dataUrl строка с адресом фотографии
   * @return {object} разметка
   */
  function createPhoto(dataUrl) {
    var preview = photoPreview.cloneNode();
    var photo = document.createElement('img');
    photo.width = PhotoData.WIDTH;
    photo.height = PhotoData.HEIGHT;
    photo.alt = PhotoData.ALT;
    photo.src = dataUrl;
    preview.appendChild(photo);
    preview.draggable = true;
    return preview;
  }
  /**
   * добавляет загруженные в форму фотографии на страницу
   *
   * @param {object} files объект с фотографиями
   *
   */
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
  /**
   * удаляет загруженные в форму фотографии со страницы
   *
   */
  function removePhotos() {
    var photosList = photoContainer.querySelectorAll(Selector.PHOTO_PREVIEW);
    for (var i = 0; i < photosList.length - 1 && photosList.length > 1; i++) {
      photosList[i].remove();
    }
  }
  /**
   * добавляет событие перетаскивания для фотографии
   *
   * @param {object} evt объект события
   *
   */
  function onPhotoDragAndDrop(evt) {
    var draggedItem = evt.target.parentNode;
    var firstItem = photoContainer.firstElementChild;
    var lastItem = photoContainer.lastElementChild;
    /**
     * добавляет события dragover
     *
     * @param {object} dragoverEvt объект события
     * @return {boolean} false
     */
    function onPhotoDragover(dragoverEvt) {
      dragoverEvt.preventDefault();
      if (dragoverEvt.target !== firstItem && dragoverEvt.target !== lastItem && dragoverEvt.target !== photoContainer) {
        dragoverEvt.target.style.opacity = DragAndDropStyle.PHOTO_DRAGOVER_OPACITY;
        dragoverEvt.target.style.transitionDuration = DragAndDropStyle.PHOTO_DRAGOVER_TRANSITION;
      }
      return false;
    }
    /**
     * добавляет событие drop для фотографии
     *
     * @param {object} dropEvt объект события
     *
     */
    function onPhotoDrop(dropEvt) {
      var target = dropEvt.target.parentNode;
      var dropTarget = target;

      dropEvt.target.style.opacity = '';

      if (target.parentNode === photoContainer) {
        if (target === lastItem.previousSibling) {
          dropTarget = lastItem;
        } else if (target === firstItem.nextSibling) {
          dropTarget = firstItem.previousSibling;
        }
        photoContainer.insertBefore(draggedItem, dropTarget);
        dropEvt.preventDefault();
      }
    }
    /**
     * добавляет событие dragleave для фотографии
     *
     * @param {object} dragleaveEvt объект события
     *
     */
    function onPhotoDragleave(dragleaveEvt) {
      dragleaveEvt.target.style.opacity = '';
      dragleaveEvt.preventDefault();
    }
    // добавляем обработчик собития dragover для блока с фотографиями
    photoContainer.addEventListener('dragover', onPhotoDragover);
    // добавляем обработчик собития drop для блока с фотографиями
    photoContainer.addEventListener('drop', onPhotoDrop);
    // добавляем обработчик собития dragleave для блока с фотографиями
    photoContainer.addEventListener('dragleave', onPhotoDragleave);
  }
  // добавляем обработчик события change для поля загрузки фотографий
  photosChooser.addEventListener('change', function () {
    var files = photosChooser.files;
    addPhotos(files);
  }, false);
  // добавляем обработчик события dragover для дропзоны при перетаскивании фотографий
  photosDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    photosDropZone.style.backgroundColor = DragAndDropStyle.PHOTOS_DRAGOVER_BACKGROUND;
  }, false);
  // добавляем обработчик события dragleave для дропзоны при перетаскивании фотографий
  photosDropZone.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    photosDropZone.style.backgroundColor = '';
  }, false);
  // добавляем обработчик события drop для дропзоны при перетаскивании фотографий
  photosDropZone.addEventListener('drop', function (evt) {
    var files = evt.dataTransfer.files;
    photosDropZone.style.backgroundColor = '';
    evt.stopPropagation();
    evt.preventDefault();
    addPhotos(files);
  }, false);
  // добавляем обработчик события dragstart для блока с фотографиями
  photoContainer.addEventListener('dragstart', onPhotoDragAndDrop, false);

  window.photos = {
    remove: removePhotos
  };

})();
