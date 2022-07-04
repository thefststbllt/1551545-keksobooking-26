import {INPUT_NUMBERS} from './form.js';

const moneySlider = document.querySelector('.ad-form__slider');
const moneyField = document.querySelector('#price');
const livingType = document.querySelector('#type');

moneyField.value = INPUT_NUMBERS.FIVE_THOUSAND;

noUiSlider.create(moneySlider, {
  range: {
    min: INPUT_NUMBERS.ZERO,
    '50%': INPUT_NUMBERS.TEN_THOUSAND,
    max: INPUT_NUMBERS.HUNDRED_K,
  },
  start: INPUT_NUMBERS.FIVE_THOUSAND,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

moneySlider.noUiSlider.on('update', (values, handle) => {
  moneyField.value = values[handle];
});

moneyField.addEventListener('change', () => {
  moneySlider.noUiSlider.set(this.value);
});

livingType.addEventListener('change', () => {
  switch (livingType.value) {
    case 'bungalow':
      moneySlider.noUiSlider.set(0);
      break;
    case 'flat':
      moneySlider.noUiSlider.set(INPUT_NUMBERS.FIVE_THOUSAND);
      break;
    case 'hotel':
      moneySlider.noUiSlider.set(INPUT_NUMBERS.THREE_THOUSAND);
      break;
    case 'house':
      moneySlider.noUiSlider.set(INPUT_NUMBERS.FIVE_THOUSAND);
      break;
    case 'palace':
      moneySlider.noUiSlider.set(INPUT_NUMBERS.TEN_THOUSAND);
  }
});
