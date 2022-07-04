const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formSlider = adForm.querySelector('.ad-form__slider');
const roomNumber = adForm.querySelector('#room_number');
const capacityNumber = adForm.querySelector('#capacity');
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const guestsLimit = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const INPUT_NUMBERS = {
  ZERO: 0,
  THREE_THOUSAND: 3000,
  FIVE_THOUSAND: 5000,
  TEN_THOUSAND: 10000,
  HUNDRED_K: 100000,
};

const CITY_CENTER = {
  lat: 35.67500,
  lng: 139.75000,
};

const getAdrressValues = () => {
  const locValues = (Object.values(CITY_CENTER));
  return locValues.map(element => element.toFixed(5));
};

const addressFieldTemporary = adForm.querySelector('#address');
const typeAccommodation = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
addressFieldTemporary.value = getAdrressValues().join();
priceField.min = 5000;

typeAccommodation.addEventListener('change', () => {
  switch (typeAccommodation.value) {
    case 'bungalow':
      priceField.placeholder = INPUT_NUMBERS.ZERO;
      priceField.min = INPUT_NUMBERS.ZERO;
      break;
    case 'flat':
      priceField.placeholder = INPUT_NUMBERS.FIVE_THOUSAND;
      priceField.min = INPUT_NUMBERS.FIVE_THOUSAND;
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

//Form activation
const switchOffForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children.item(i).disabled = true;
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children.item(i).disabled = true;
  }
  formSlider.disabled = true;
};

//Disabling form as default
switchOffForm();

const switchOnForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children.item(i).disabled = false;
  }
  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children.item(i).disabled = false;
  }
  formSlider.disabled = false;
};

//Validation of folks capacity
const validateCapacity = (value) => {
  const availableNumberOfGuests = guestsLimit[roomNumber.value];
  value = Number(value);
  return availableNumberOfGuests.includes(value);
};

const getCapacityErrorMessage = () => {
  const availableNumberOfGuests = guestsLimit[roomNumber.value];
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
  return value > priceFieldInner.min;
};

const getPriceErrorMessage = () => {
  const priceFieldInner = adForm.querySelector('#price');
  if (priceFieldInner.value < Math.abs(priceFieldInner.min)) {
    return `Минимальная цена ${priceFieldInner.min}`;
  }
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    adForm.submit();
  }
});

//Timein/Timeout synchronization
timeinField.addEventListener('change', () => {
  timeoutField.selectedIndex = timeinField.selectedIndex;
});

timeoutField.addEventListener('change', () => {
  timeinField.selectedIndex = timeoutField.selectedIndex;
});

export {switchOnForm};
export {addressFieldTemporary};
export {CITY_CENTER};
export {INPUT_NUMBERS};
