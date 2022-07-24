import {getLuckSendMessage, getFailSendMessage} from './messages.js';
import {resetDefaultMapMarkers} from './map-filter.js';
import {resetForm} from './reset-form.js';
import {sendData} from './api.js';
import {CITY_CENTER} from './map.js';

const GUESTS_LIMIT = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const INPUT_NUMBERS = {
  ZERO: 0,
  ONE_THOUSAND: 1000,
  THREE_THOUSAND: 3000,
  FIVE_THOUSAND: 5000,
  TEN_THOUSAND: 10000,
  HUNDRED_K: 100000,
};

const adForm = document.querySelector('.ad-form');
const roomNumber = adForm.querySelector('#room_number');
const capacityNumber = adForm.querySelector('#capacity');
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const getAddressValues = () => {
  const locValues = (Object.values(CITY_CENTER));
  return locValues.map((element) => element.toFixed(5));
};

const addressFieldTemporary = adForm.querySelector('#address');
const typeAccommodation = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
addressFieldTemporary.value = `Широта: ${getAddressValues().join(' Долгота: ')}`;
priceField.min = INPUT_NUMBERS.ONE_THOUSAND;

typeAccommodation.addEventListener('change', () => {
  switch (typeAccommodation.value) {
    case 'bungalow':
      priceField.placeholder = INPUT_NUMBERS.ZERO;
      priceField.min = INPUT_NUMBERS.ZERO;
      break;
    case 'flat':
      priceField.placeholder = INPUT_NUMBERS.ONE_THOUSAND;
      priceField.min = INPUT_NUMBERS.ONE_THOUSAND;
      break;
    case 'hotel':
      priceField.placeholder = INPUT_NUMBERS.THREE_THOUSAND;
      priceField.min = INPUT_NUMBERS.THREE_THOUSAND;
      break;
    case 'house':
      priceField.placeholder = INPUT_NUMBERS.FIVE_THOUSAND;
      priceField.min = INPUT_NUMBERS.FIVE_THOUSAND;
      break;
    case 'palace':
      priceField.placeholder = INPUT_NUMBERS.TEN_THOUSAND;
      priceField.min = INPUT_NUMBERS.TEN_THOUSAND;
  }
});

//Validation of folks capacity
const validateCapacity = (value) => {
  const availableNumberOfGuests = GUESTS_LIMIT[roomNumber.value];
  value = Number(value);
  return availableNumberOfGuests.includes(value);
};

const getCapacityErrorMessage = () => {
  const availableNumberOfGuests = GUESTS_LIMIT[roomNumber.value];
  if (availableNumberOfGuests.includes(0)) {
    return 'Не предназначено для гостей!';
  }
  const maxGuestsAmount = Math.max.apply(Math, availableNumberOfGuests);
  return `Не более ${maxGuestsAmount} на это количество комнат!`;
};

pristine.addValidator(capacityNumber, validateCapacity, getCapacityErrorMessage);

//Price validation
const validatePrice = (value) => {
  const priceFieldInner = adForm.querySelector('#price');
  value = Number(value);
  return value >= priceFieldInner.min;
};

const getPriceErrorMessage = () => {
  const priceFieldInner = adForm.querySelector('#price');
  if (priceFieldInner.value < Math.abs(priceFieldInner.min)) {
    return `Минимальная цена ${priceFieldInner.min}`;
  }
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

//Submitting valid form
const setUserFormSubmit = (objects) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => {
          getLuckSendMessage();
          resetForm();
          resetDefaultMapMarkers(objects);
        },
        () => {
          getFailSendMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

//Timein/Timeout synchronization
timeinField.addEventListener('change', () => {
  timeoutField.selectedIndex = timeinField.selectedIndex;
});

timeoutField.addEventListener('change', () => {
  timeinField.selectedIndex = timeoutField.selectedIndex;
});

export {setUserFormSubmit, getAddressValues, addressFieldTemporary, CITY_CENTER, INPUT_NUMBERS};
