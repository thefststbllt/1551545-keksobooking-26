import {advertList} from './data.js';

const similarListOffers = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdverts = advertList(1);


similarAdverts.forEach((offer) => {
  const offerElement = similarOfferTemplate.cloneNode(true);
  const featureList = offerElement.querySelectorAll('.popup__feature');
  const modifiers = offer.offer.features.map((featureCurrent) => `popup__feature--${featureCurrent}`);
  const photoList = offerElement.querySelector('.popup__photos');
  //title
  if (offer.offer.title === undefined) {
    offerElement.querySelector('.popup__title').classList.add('hidden');
  }
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  //address
  if (offer.offer.address === undefined) {
    offerElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  //price
  if (offer.offer.price === undefined) {
    offerElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  //housing type
  if (offer.offer.type === undefined) {
    offerElement.querySelector('.popup__type').classList.add('hidden');
  } else {
    for (let i = 0; i < offer.offer.type.length - 1; i++) {
      switch (offer.offer.type) {
        case 'palace':
          offer.offer.type = 'Дворец';
          break;
        case 'flat':
          offer.offer.type = 'Квартира';
          break;
        case 'house':
          offer.offer.type = 'Дом';
          break;
        case 'bungalow':
          offer.offer.type = 'Бунгало';
          break;
        case 'hotel':
          offer.offer.type = 'Отель';
      }
    }
  }
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  //room capacity
  if (offer.offer.rooms === undefined || offer.offer.guests === undefined) {
    offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  //checkin-checkout time
  if (offer.offer.checkin === undefined || offer.offer.checkout === undefined) {
    offerElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  //features
  if (offer.offer.features.length === 0) {
    offerElement.querySelector('.popup__features').classList.add('hidden');
  }
  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
  //description
  if (offer.offer.description === '') {
    offerElement.querySelector('.popup__description').classList.add('hidden');
  }
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  //photos
  if (offer.offer.photos.length === 0) {
    offerElement.querySelector('.popup__photos').classList.add('hidden');
  }
  for (let i = 1; i < offer.offer.photos.length; i++) {
    const photoItem = offerElement.querySelector('.popup__photo');
    photoList.appendChild(photoItem.cloneNode(true));
  }
  for (let i = 0; i < offer.offer.photos.length; i++) {
    photoList.children[i].src = offer.offer.photos[i];
  }
  //avatar
  if (offer.author.avatar === undefined) {
    offerElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  similarListOffers.appendChild(offerElement);
});
