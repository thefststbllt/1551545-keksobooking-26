import {advertList} from './data.js';

const similarListOffers = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdverts = advertList(1);


similarAdverts.forEach((offer) => {
  const offerElement = similarOfferTemplate.cloneNode(true);
  //title
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  //address
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  //price
  offerElement.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;
  //housing type
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
  offerElement.querySelector('.popup__type').textContent = offer.offer.type;
  //room capacity
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  //checkin-checkout time
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  //features
  const featureList = offerElement.querySelectorAll('.popup__feature');
  const modifiers = offer.offer.features.map((featureCurrent) => `popup__feature--${featureCurrent}`);
  featureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
  //description
  offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  //photos
  const photoList = offerElement.querySelector('.popup__photos');
  for (let i = 1; i < offer.offer.photos.length; i++) {
    const photoItem = offerElement.querySelector('.popup__photo');
    photoList.appendChild(photoItem.cloneNode(true));
  }
  for (let i = 0; i < offer.offer.photos.length; i++) {
    photoList.children[i].src = offer.offer.photos[i];
  }
  //avatar
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;
  similarListOffers.appendChild(offerElement);
});
