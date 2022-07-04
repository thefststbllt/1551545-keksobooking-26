const moneySlider = document.querySelector('.ad-form__slider');
const moneyField = document.querySelector('#price');
const livingType = document.querySelector('#type');

moneyField.value = 5000;

noUiSlider.create(moneySlider, {
  range: {
    min: 0,
    '50%': 10000,
    max: 100000,
  },
  start: 5000,
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
      moneySlider.noUiSlider.set(5000);
      break;
    case 'hotel':
      moneySlider.noUiSlider.set(3000);
      break;
    case 'house':
      moneySlider.noUiSlider.set(5000);
      break;
    case 'palace':
      moneySlider.noUiSlider.set(10000);
  }
});
