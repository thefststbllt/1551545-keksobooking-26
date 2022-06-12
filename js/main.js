// Example of the function below was gently peeked from https://learn.javascript.ru/task/random-int-min-max

function getRandomInteger(min, max) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      return undefined;
    }
    if (min === max) {
      return min;
    }
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  return undefined;
}

getRandomInteger(5, 200);

/* Example of the function below was gently peeked from https://learn.javascript.ru/task/random-min-max &
 https://javascript.ru/forum/misc/2860-okruglenie-do-nuzhnogo-kolichestva-znakov-posle-zapyatojj.html
*/

function getRandomFlops(min, max, symbols) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      return undefined;
    }
    if (min === max) {
      return min;
    }
    const randomNumber = min + Math.random() * (max - min);
    if (isNaN(randomNumber) || isNaN(symbols)) {
      return false;
    }
    const m = Math.pow(10, symbols);
    return Math.round(randomNumber * m) / m;
  }
  return undefined;
}

getRandomFlops(0, 1, 1);

// HOMEWORK module4-task1 branch

const SIMILAR_ADVERT_COUNT = 10;
const placeType = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkTime = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosList = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',];

const generatedValues = [];

function getArray() {
  while (generatedValues.length < SIMILAR_ADVERT_COUNT) {
    const value = getRandomInteger(1, SIMILAR_ADVERT_COUNT);
    if (!generatedValues.includes(value)) {
      generatedValues.push(value);
    }
  }
}

function getAvatarArrayElements() {
  const orderNumber = (`0${  generatedValues.shift()}`).slice(-2);
  return `img/avatars/user${  String(orderNumber)  }.png`;
}

function createAdvert() {
  return {
    author: {avatar: getAvatarArrayElements()},
    offer: {
      title: 'Offer',
      address: 'location.lat, location.lng',
      price: getRandomInteger(100, 50000),
      type: placeType[getRandomInteger(0, placeType.length - 1)],
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: checkTime[getRandomInteger(0, checkTime.length - 1)],
      checkout: checkTime[getRandomInteger(0, checkTime.length - 1)],
      features: featuresList.slice(0, getRandomInteger(1, featuresList.length)),
      description: 'Best offer you ve ever get!',
      photos: photosList.slice(0, getRandomInteger(1, photosList.length)),
    },
    location: {
      lat: getRandomFlops(35.65, 35.7, 8),
      lng: getRandomFlops(139.7, 139.8, 8),
    },
  };
}

//Array generating
getArray();
const advertList = Array.from({length: SIMILAR_ADVERT_COUNT}, createAdvert);

function returnAdvertList () {
  return advertList;
}

returnAdvertList();

