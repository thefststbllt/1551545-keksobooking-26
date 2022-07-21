import {debounce} from './util.js';
import {createSimilarList, MARKERS_LIMIT, removeSimilarList} from './map.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');

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

const getSimilarType = (offer) => {
  return housingType.value === 'any' || housingType.value === offer.offer.type;
};

const getSimilarPrice = (offer) => {
  const minPrice = (PRICE_RANGE[housingPrice.value.toUpperCase()].min);
  const maxPrice = (PRICE_RANGE[housingPrice.value.toUpperCase()].max);

  return offer.offer.price >= minPrice && offer.offer.price < maxPrice;
};

const getSimilarRoomsAmount = (offer) => {
  return housingRooms.value === 'any' || +housingRooms.value === offer.offer.rooms;
};

const getSimilarGuestsAmount = (offer) => {
  return housingGuests.value === 'any' || +housingGuests.value >= offer.offer.guests;
};

const getSimilarFeatures = (offer, checkedFeatures) => {
  const offerFeatures = offer.offer.features;
  return checkedFeatures.every(feature => offerFeatures?.includes(feature.value));
};

const defineSimilarOffer = (offer, checkedFeatures) => {
  return getSimilarType(offer) && getSimilarPrice(offer) && getSimilarRoomsAmount(offer) && getSimilarGuestsAmount(offer) && getSimilarFeatures(offer, checkedFeatures);
};

const resetMapMarkers = (objects) => {
  mapFilters.addEventListener('change', debounce(() => {
    let filteredPins = [];
    removeSimilarList();
    const checkedUserFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'));
    for (let i = 0; i < objects.length; i++) {
      if (defineSimilarOffer(objects[i], checkedUserFeatures)) {
        filteredPins.push(objects[i]);
        if (filteredPins.length >= MARKERS_LIMIT) {
          break;
        }
      }
    }
    console.log(filteredPins);
    createSimilarList(filteredPins);
  }));
};

export {resetMapMarkers};
