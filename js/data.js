import {getRandomInteger} from './util.js';
import {getRandomFlops} from './util.js';

const SIMILAR_ADVERT_COUNT = 10;
const PLACE_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_LIST = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',];
const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;

const generatedValues = [];

const getArray = () => {
  while (generatedValues.length < SIMILAR_ADVERT_COUNT) {
    const value = getRandomInteger(1, SIMILAR_ADVERT_COUNT);
    if (!generatedValues.includes(value)) {
      generatedValues.push(value);
    }
  }
};

const getAvatarArrayElements = () => {
  const orderNumber = (`0${generatedValues.shift()}`).slice(-2);
  return `img/avatars/user${String(orderNumber)}.png`;
};

const createAdvert = () => ({
  author: {avatar: getAvatarArrayElements()},
  offer: {
    title: 'Offer',
    address: 'location.lat, location.lng',
    price: getRandomInteger(100, 50000),
    type: PLACE_TYPE[getRandomInteger(0, PLACE_TYPE.length - 1)],
    rooms: getRandomInteger(1, 10),
    guests: getRandomInteger(1, 10),
    checkin: TIME_LIST[getRandomInteger(0, TIME_LIST.length - 1)],
    checkout: TIME_LIST[getRandomInteger(0, TIME_LIST.length - 1)],
    features: FEATURES_LIST.slice(0, getRandomInteger(1, FEATURES_LIST.length)),
    description: 'Best offer you ve ever get!',
    photos: PHOTOS_LIST.slice(0, getRandomInteger(1, PHOTOS_LIST.length)),
  },
  location: {
    lat: getRandomFlops(MIN_LATITUDE, MAX_LATITUDE, 8),
    lng: getRandomFlops(MIN_LONGITUDE, MAX_LONGITUDE, 8),
  },
});

//Array generating
getArray();
const advertList = (count) => Array.from({length: count}, createAdvert);

export {advertList};
