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

const addressFieldTemporary = adForm.querySelector('#address');
const typeAccommodation = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');
addressFieldTemporary.value = '35.7, 139.8';
priceField.min = 5000;

typeAccommodation.addEventListener('change', () => {
  switch (typeAccommodation.value) {
    case 'bungalow':
      priceField.placeholder = 0;
      priceField.min = 0;
      break;
    case 'flat':
      priceField.placeholder = 5000;
      priceField.min = 5000;
      break;
    case 'hotel':
      priceField.placeholder = 3000;
      priceField.min = 3000;
      break;
    case 'house':
      priceField.placeholder = 5000;
      priceField.min = 5000;
      break;
    case 'palace':
      priceField.placeholder = 10000;
      priceField.min = 10000;
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

switchOffForm(window.load);

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

switchOnForm();

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
  if (priceFieldInner.value < priceFieldInner.min) {
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
  switch (timeinField.value) {
    case '12:00':
      timeoutField.value = timeinField.value;
      break;
    case '13:00':
      timeoutField.value = timeinField.value;
      break;
    case '14:00':
      timeoutField.value = timeinField.value;
      break;
  }
});

timeoutField.addEventListener('change', () => {
  switch (timeoutField.value) {
    case '12:00':
      timeinField.value = timeoutField.value;
      break;
    case '13:00':
      timeinField.value = timeoutField.value;
      break;
    case '14:00':
      timeinField.value = timeoutField.value;
      break;
  }
});
