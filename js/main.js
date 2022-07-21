import './data.js';
import './elements.js';
import './form.js';
import './map.js';
import './money-slider.js';
import './reset-form.js';
import './map-filter.js';
import {getData} from './api.js';
import {createSimilarList} from './map.js';
import {activateForm} from './form.js';
import {getErrorMessage} from './messages.js';
import {setUserFormSubmit} from './form.js';
import {resetMapMarkers} from './map-filter.js';

getData(
  (objects) => {
    createSimilarList(objects);
    resetMapMarkers(objects);
  },
  (message) => {
    activateForm(false);
    getErrorMessage(message);
  },
);

setUserFormSubmit();
