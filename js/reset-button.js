import {resetForm} from './form.js';

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', () => {
  resetForm();
});
