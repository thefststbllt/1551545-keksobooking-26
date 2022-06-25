const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formSlider = adForm.querySelector('.ad-form__slider');

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
