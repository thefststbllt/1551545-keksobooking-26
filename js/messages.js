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
    luckSendElement.remove();
  });
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      luckSendElement.remove();
    }
  });
};

const getFailSendMessage = () => {
  const failSendMessage = document.querySelector('#error').content.querySelector('.error');
  const failSendElement = failSendMessage.cloneNode(true);
  mainBody.append(failSendElement);
  mainBody.addEventListener('click', () => {
    failSendElement.remove();
  });
  mainBody.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      failSendElement.remove();
    }
  });
};

export {getErrorMessage, getLuckSendMessage, getFailSendMessage};
