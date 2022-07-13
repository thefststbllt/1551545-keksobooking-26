import {switchOnForm} from './form.js';
import {addressFieldTemporary} from './form.js';
import {createCustomPopup} from './elements.js';
import {CITY_CENTER} from './form.js';

const map = L.map('map-canvas')
  .on('load', () => {
    switchOnForm();
  })
  .setView(CITY_CENTER, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  CITY_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const newMarkValues = [];
  const markValues = Object.values(evt.target.getLatLng());
  markValues.map((element) => {
    newMarkValues.push(element.toFixed(5));
  });
  addressFieldTemporary.value = newMarkValues.join();
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const {lat, lng} = offer.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(offer));
};

const createSimilarList = (serverObjects) => {
  serverObjects.forEach((offer) => {
    createMarker(offer);
  });
};

export {createSimilarList, mainPinMarker};

