import {resetMap} from './map.js';

const resetButton = document.querySelector('.ad-form__reset');
const filterForm = document.querySelector('.map__filters');
const offerForm = document.querySelector('.ad-form');

const resetForm = () => {
  filterForm.reset();
  offerForm.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


