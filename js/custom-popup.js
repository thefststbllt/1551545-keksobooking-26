const HOUSING_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const createCustomPopup = (offer) => {
  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = similarOfferTemplate.cloneNode(true);

  //Inner offer elements
  const offerTitle = offerElement.querySelector('.popup__title');
  const offerAddress = offerElement.querySelector('.popup__text--address');
  const offerPrice = offerElement.querySelector('.popup__text--price');
  const offerType = offerElement.querySelector('.popup__type');
  const offerCapacity = offerElement.querySelector('.popup__text--capacity');
  const offerTime = offerElement.querySelector('.popup__text--time');
  const offerFeatures = offerElement.querySelector('.popup__features');
  const featureList = offerElement.querySelectorAll('.popup__feature');
  const offerDescription = offerElement.querySelector('.popup__description');
  const offerPhotos = offerElement.querySelector('.popup__photos');
  const offerAvatar = offerElement.querySelector('.popup__avatar');

  //title
  if (offer.offer.title === undefined) {
    offerTitle.classList.add('hidden');
  }
  offerTitle.textContent = offer.offer.title;
  //address
  if (offer.offer.address === undefined) {
    offerAddress.classList.add('hidden');
  }
  offerAddress.textContent = offer.offer.address;
  //price
  if (offer.offer.price === undefined) {
    offerPrice.classList.add('hidden');
  }
  offerPrice.textContent = `${offer.offer.price} ₽/ночь`;
  //housing type
  if (offer.offer.type === undefined) {
    offerType.classList.add('hidden');
  } else {
    offerType.textContent = HOUSING_TYPES[offer.offer.type];
  }
  //room capacity
  if (offer.offer.rooms === undefined || offer.offer.guests === undefined) {
    offerCapacity.classList.add('hidden');
  }
  offerCapacity.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  //checkin-checkout time
  if (offer.offer.checkin === undefined || offer.offer.checkout === undefined) {
    offerTime.classList.add('hidden');
  }
  offerTime.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
  //features
  if (offer.offer.features === undefined) {
    offerFeatures.classList.add('hidden');
  } else {
    featureList.forEach((featureListItem) => {
      const modifiers = offer.offer.features.map((featureCurrent) => `popup__feature--${featureCurrent}`);
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  }
  //description
  if (offer.offer.description === '') {
    offerDescription.classList.add('hidden');
  }
  offerDescription.textContent = offer.offer.description;
  //photos
  if (offer.offer.photos === undefined) {
    offerPhotos.classList.add('hidden');
  } else {
    const photoItem = offerElement.querySelector('.popup__photo');
    for (let i = 1; i < offer.offer.photos.length; i++) {
      offerPhotos.appendChild(photoItem.cloneNode(true));
    }
    for (let i = 0; i < offer.offer.photos.length; i++) {
      offerPhotos.children[i].src = offer.offer.photos[i];
    }}
  //avatar
  if (offer.author.avatar === undefined) {
    offerAvatar.classList.add('hidden');
  }
  offerAvatar.src = offer.author.avatar;

  return offerElement;
};

export {createCustomPopup};
