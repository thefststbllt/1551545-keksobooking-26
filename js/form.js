const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formSlider = adForm.querySelector('.ad-form__slider');
const roomNumber = document.querySelector('#room_number');
const capacityNumber = document.querySelector('#capacity');
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

const priceFieldTemporary = adForm.querySelector('#address');
priceFieldTemporary.value = '35.7, 139.8';

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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    adForm.submit();
  }
});
