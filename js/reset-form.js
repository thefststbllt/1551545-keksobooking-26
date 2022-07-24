import {resetDefaultMapMarkers} from './map-filter.js';
import {moneySliderReset} from './money-slider.js';
import {photoReset} from './photo.js';
import {resetMap} from './map.js';

const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const resetForm = () => {
  mapFilters.reset();
  adForm.reset();
  resetMap();
  moneySliderReset();
  photoReset();
};

const resetAllOnDefault = (objects) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    resetDefaultMapMarkers(objects);
  });
};

export {resetAllOnDefault, resetForm};
