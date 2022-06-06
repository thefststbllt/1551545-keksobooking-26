// Example of the function below was gently peeked from https://learn.javascript.ru/task/random-int-min-max

function randomInteger(min, max) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      console.log('Неправильно задан диапазон значений, попробуйте поменять значения местами');
      return undefined;
    }
    if (min === max) {
      console.log('Граничные значения равны друг другу');
    }
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  console.log('Ошибка! Числа из диапазона должны быть положительными, включая 0');
}

let result = randomInteger(5, 200);
console.log(result);

/* Example of the function below was gently peeked from https://learn.javascript.ru/task/random-min-max &
 https://javascript.ru/forum/misc/2860-okruglenie-do-nuzhnogo-kolichestva-znakov-posle-zapyatojj.html
*/

function randomFlops(min, max, symbols) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      console.log('Неправильно задан диапазон значений, попробуйте поменять значения местами');
      return undefined;
    }
    if (min === max) {
      console.log('Граничные значения равны друг другу');
    }
    let randomNumber = min + Math.random() * (max - min);
    if (isNaN(randomNumber) || isNaN(symbols)) return false;
    let m = Math.pow(10, symbols);
    return Math.round(randomNumber*m)/m;
  }
  console.log('Ошибка! Числа из диапазона должны быть положительными, включая 0');
}

let resultRandomFlops = randomFlops(0, 1, 1);
console.log(resultRandomFlops);
