const mainBody = document.querySelector('body');

const getErrorMessage = () => {
  const errorMessage = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorMessage.cloneNode(true);
  errorElement.innerHTML = '<p class="error__message">Сервер не отвечает...</p>';
  mainBody.append(errorElement);
};

const getLuckSendMessage = () => {
  const luckSendMessage = document.querySelector('#success').content.querySelector('.success');
  const luckSendElement = luckSendMessage.cloneNode(true);
  mainBody.append(luckSendElement);
  mainBody.addEventListener('click', () => {
    mainBody.removeChild(luckSendElement);
  });
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      mainBody.removeChild(luckSendElement);
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
    if (evt.key === 'Escape') {
      mainBody.removeChild(failSendElement);
    }
  });
};

export {getErrorMessage, getLuckSendMessage, getFailSendMessage};
