import './data.js';
import './elements.js';
import './form.js';
import './map.js';
import './money-slider.js';
import {getData} from './api.js';
import {createSimilarList} from './map.js';
import {activateForm} from './form.js';
import {getErrorMessage} from './messages.js';
import {setUserFormSubmit} from './form.js';

getData(
  (objects) => createSimilarList(objects.slice(0, 10)),
  (message) => {
    activateForm(false);
    getErrorMessage(message);
  },
);

setUserFormSubmit();
