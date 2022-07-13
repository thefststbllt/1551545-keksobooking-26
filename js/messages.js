import {resetForm} from './form.js';

const mainBody = document.querySelector('body');

const getErrorMessage = (message) => {
  const errorMessage = document.createElement('div');
  errorMessage.innerHTML = `${message} - Что-то пошло не так...`;
  errorMessage.style.cssText = 'color: tomato';
  const errorMap = document.querySelector('.map');
  errorMap.append(errorMessage);
};

const getLuckSendMessage = () => {
  const luckSendMessage = document.querySelector('#success').content.querySelector('.success');
  const luckSendElement = luckSendMessage.cloneNode(true);
  mainBody.append(luckSendElement);
  mainBody.addEventListener('click', () => {
    mainBody.removeChild(luckSendElement);
    resetForm();
  });
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      mainBody.removeChild(luckSendElement);
      resetForm();
    }
  });
};

const getFailSendMessage = () => {
  const failSendMessage = document.querySelector('#error').content.querySelector('.error');
  const failSendElement = failSendMessage.cloneNode(true);
  mainBody.append(failSendElement);
  mainBody.addEventListener('click', () => {
    mainBody.removeChild(failSendElement);
  });
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      mainBody.removeChild(failSendElement);
    }
  });
};

export {getErrorMessage, getLuckSendMessage, getFailSendMessage};
