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
    return Math.round(randomNumber*m)/m;
  }
  return undefined;
}

getRandomFlops(0, 1, 1);
