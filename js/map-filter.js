import {createSimilarList, MARKERS_LIMIT, removeMarkers} from './map.js';
import {debounce} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

const ANY = 'any';
const PRICE_RANGE = {
  ANY: {
    min: 0,
    max: 100000,
  },
  LOW: {
    min: 0,
    max: 10000,
  },
  MIDDLE: {
    min: 10000,
    max: 50000,
  },
  HIGH: {
    min: 50000,
    max: 100000,
  },
};

//Getting suited type
const getSimilarType = (offer) => housingType.value === ANY || housingType.value === offer.offer.type;

//Getting suited price
const getSimilarPrice = (offer) => {
  const minPrice = (PRICE_RANGE[housingPrice.value.toUpperCase()].min);
  const maxPrice = (PRICE_RANGE[housingPrice.value.toUpperCase()].max);

  return offer.offer.price >= minPrice && offer.offer.price < maxPrice;
};

//Getting suited rooms amount
const getSimilarRoomsAmount = (offer) => housingRooms.value === ANY || Number(housingRooms.value) === offer.offer.rooms;

//Getting suited guests amount
const getSimilarGuestsAmount = (offer) => housingGuests.value === ANY || Number(housingGuests.value) >= offer.offer.guests;

//Getting suited features
const getCheckedFeatures = () => Array.from(document.querySelectorAll('.map__checkbox:checked'), ({value}) => value);

const getSimilarFeatures = (offer) => {
  const checkedFeatures = getCheckedFeatures();
  if (offer.offer.features) {
    return checkedFeatures.every((feature) => offer.offer.features.includes(feature));
  }
  return false;
};

//Defining suited offer withing array
const defineSimilarOffer = (objects) => objects.filter((offer) => (getSimilarType(offer) && getSimilarPrice(offer) && getSimilarRoomsAmount(offer) && getSimilarGuestsAmount(offer) && getSimilarFeatures(offer)));

const resetMapMarkers = (objects) => {

  mapFilters.addEventListener('change', () => {
    removeMarkers();
    const filteredArray = [];
    for (const offer of defineSimilarOffer(objects)) {
      if (filteredArray.length >= MARKERS_LIMIT) {
        break;
      }
      if (defineSimilarOffer(objects)) {
        filteredArray.push(offer);
      }
    }
    debounce(() => createSimilarList(filteredArray))();
  });
};

export {resetMapMarkers};
