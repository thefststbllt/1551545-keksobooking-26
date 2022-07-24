import {getAddressValues, addressFieldTemporary} from './form.js';
import {switchOnForm} from './form-activation.js';
import {createCustomPopup} from './custom-popup.js';

const CITY_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const MARKERS_LIMIT = 10;
const ZOOM_NUMBER = 13;

const map = L.map('map-canvas')
  .on('load', () => {
    switchOnForm();
  })
  .setView({lat: 35.675, lng: 139.75,}, ZOOM_NUMBER);

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
  addressFieldTemporary.value = `Широта: ${newMarkValues.join(' Долгота: ')}`;
});

const iconBasic = L.icon({
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
      icon: iconBasic,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(offer));
};

const createSimilarList = (serverObjects) => {
  const slicedArray = serverObjects.slice(0, MARKERS_LIMIT);
  return slicedArray.forEach((offer) => {
    createMarker(offer);
  });
};

const removeMarkers = () => {
  markerGroup.clearLayers();
};

const resetMap = (x = CITY_CENTER.lat, y = CITY_CENTER.lng) => {
  map.setView({
    lat: x,
    lng: y,
  }, ZOOM_NUMBER);

  mainPinMarker.setLatLng(CITY_CENTER);
  addressFieldTemporary.value = `Широта: ${getAddressValues().join(' Долгота: ')}`;
  map.closePopup();
};

export {createSimilarList, resetMap, removeMarkers, createMarker, mainPinMarker, MARKERS_LIMIT, CITY_CENTER};
