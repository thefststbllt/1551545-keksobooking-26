const getRandomInteger = (min, max) => {
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
};

const getRandomFlops = (min, max, symbols) => {
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
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger};
export {getRandomFlops};
export {debounce};
