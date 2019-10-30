'use strict';

// редактор загруженной картинки

(function () {
  var uploadPictureInput = document.querySelector('#upload-file');
  var pictureEditor = document.querySelector('.img-upload__overlay');
  var pictureEditorClose = document.querySelector('#upload-cancel');

  window.onOpenEditorEscPress = function (evt) {
    if (evt.keyCode === window.keycode.esc) {
      window.closePopup(pictureEditor);
    }
  };
  window.onCloseEditorEnterPress = function (evt) {
    if (evt.keyCode === window.keycode.enter) {
      window.openPopup(pictureEditor);
    }
  };

  uploadPictureInput.addEventListener('change', function () {
    window.openPopup(pictureEditor);
  });

  pictureEditorClose.addEventListener('click', function () {
    window.closePopup(pictureEditor);
  });

  pictureEditorClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keycode.esc) {
      window.closePopup(pictureEditor);
    }
  });

  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var effectSliderButton = document.querySelector('.effect-level__pin');
  var effectSliderButtonValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectPictureUploadPreview = document.querySelector('.img-upload__preview');

  var onEffectRadioButton = function () {
    var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
    effectPictureUploadPreview.setAttribute('style', 'filter: 0');
    effectSliderButton.style.left = 453 + 'px';
    effectLevelDepth.style.width = 453 + 'px';
    effectLevel.classList.remove('hidden');
    effectPictureUploadPreview.className = 'img-upload__preview';
    effectPictureUploadPreview.classList.add('effects__preview--' + effectActiveRadioButton.value);
    if (effectActiveRadioButton.value === 'none') {
      effectLevel.classList.add('hidden');
    }
  };

  effectLevel.classList.add('hidden');
  effects.addEventListener('click', onEffectRadioButton, true);

  // изменение насыщенности фильтров при перемещении пина

  effectSliderButton.addEventListener('mousedown', function (evt) {
    var PERCENTAGE_MAX = 100;

    evt.preventDefault();
    var startX = evt.clientX;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var shiftX = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var newPositionLeft = effectSliderButton.offsetLeft - shiftX;
      if (newPositionLeft > window.sliderPoint.end) {
        effectSliderButton.style.left = window.sliderPoint.end + 'px';
        effectLevelDepth.style.width = window.sliderPoint.end + 'px';
      } else if (newPositionLeft < window.sliderPoint.start) {
        effectSliderButton.style.left = window.sliderPoint.start + 'px';
        effectLevelDepth.style.width = window.sliderPoint.start + 'px';
      } else {

        effectLevelDepth.style.width = newPositionLeft + 'px';
        effectSliderButton.style.left = newPositionLeft + 'px';
        effectSliderButtonValue.setAttribute('value', effectSliderButton.offsetLeft);

        var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
        var effectCurrent = document.querySelector('.img-upload__preview.effects__preview--' + effectActiveRadioButton.value);
        var filtersObject = {
          none: 'none',
          marvin: 'invert(' + effectSliderButton.offsetLeft * PERCENTAGE_MAX / window.sliderPoint.end + '%' + ')',
          chrome: 'grayscale(' + effectSliderButton.offsetLeft / window.sliderPoint.end + ')',
          sepia: 'sepia(' + effectSliderButton.offsetLeft / window.sliderPoint.end + ')',
          phobos: 'blur(' + effectSliderButton.offsetLeft * window.effectPoint.blureffectmax / window.sliderPoint.end + 'px' + ')',
          heat: 'brightness(' + effectSliderButton.offsetLeft * window.effectPoint.brightnesseffectmax / window.sliderPoint.end + ')'
        };
        effectCurrent.style.filter = filtersObject[effectActiveRadioButton.value];
      }
    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
