import './money-slider.js';
import './photo.js';
import {getData} from './api.js';
import {createSimilarList} from './map.js';
import {getErrorMessage} from './messages.js';
import {setUserFormSubmit} from './form.js';
import {resetMapMarkers} from './map-filter.js';
import {resetAllOnDefault} from './reset-form.js';
import {activateForm} from './form-activation.js';

getData(
  (objects) => {
    createSimilarList(objects);
    resetMapMarkers(objects);
    resetAllOnDefault(objects);
    setUserFormSubmit(objects);
  },
  (message) => {
    activateForm(false);
    getErrorMessage(message);
  },
);
