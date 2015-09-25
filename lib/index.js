'use strict';

(function () {


  /**
   * Get random value from an array or generate min random number between to number
   * @param min (Number|Array) Min random integer or an array where to pick min value
   * @param max (Number) Max random integer
   * @param multiply (Number) number to multiply the result
   *
   * @example
   *
   * random(1,2) => 1 or 2
   * random('cerise','banane','poire','pomme']) => cerise, or banane or poire, etc....
   * random(10, 250, 1000) => 10000, 15000, 20000, ... 100000, 250000
   */
  function random(min, max, multiply) {
    var num;
    if (min instanceof Array) {
      num = Math.round(Math.random() * (min.length - 1));
      return min[num];
    }
    return (Math.round(Math.random() * (max - min)) + min) * (multiply || 1);
  }


  /**
   * Generate an array with values by ratio.
   * @name  byRatio
   * @param {Object} source ratio object, keys are the values in the array, values are number of each time you want to see the value
   * @returns {Array} result array
   *
   * @example
   *   byRatio({
   *      man: 3,
   *      woman: 7,
   *   });
   *
   *   => ['man','man','man','woman','woman','woman','woman','woman','woman','woman']
   *
   *   byRatio({
   *      1: 3,
   *      2: 2,
   *      3: 4
   *   })
   *
   *   => [1,1,1,2,2,3,3,3,3]
   */
  function ratioArray(id, source, purge) {
    if (purge && byRatioStore[id]) {
      delete byRatioStore[id];
    }
    if (byRatioStore[id]) {
      return byRatioStore[id];
    }

    var newArray = [];
    var key;
    for (key in source) {
      /* istanbul ignore else */
      if (source.hasOwnProperty(key)) {
        newArray = newArray.concat(new Array(source[key] + 1).join(',' + key).split(',').slice(1));
      }
    }
    byRatioStore[id] = newArray;
    return newArray;
  }


  var byRatioStore = {};

  /**
   * Return value by ratio
   * @param {String} id   The name of the ratio, it's usefull when you want to "cache" the generated array (improve performance)
   * @param values
   * @returns {*}
   *
   * @example
   *
   */
  function byRatio(id, values, purge) {
    var arr = ratioArray(id, values, purge);
    return random(arr);
  }


  /* eslint-disable */
  function fy(a, b, c, d) {// array,placeholder,placeholder,placeholder
    c = a.length;
    while (c)b = Math.random() * c-- | 0, d = a[c], a[c] = a[b], a[b] = d; // eslint ignore:line
  }

  /* eslint-enable */


  /**
   * Get some values into
   * @param {Array} array - array of data
   * @param {Number} [numOfElementsToTake] - Number of elements to take in the array, if no number is given, the number of element is random
   * @returns {Array} - Array of values taken into the array. The values are unique.
   */
  function randomArray(array, numOfElementsToTake) {
    var arrayOfNumbers = [];
    var i;
    var list;

    numOfElementsToTake = numOfElementsToTake || random(1, array.length);
    for (i = 0; i < array.length; i++) {
      arrayOfNumbers.push(i);
    }
    fy(arrayOfNumbers);
    list = arrayOfNumbers.slice(0, numOfElementsToTake);
    return list.map(function (num) {
      return array[num];
    });
  }

  var randomValues = {
    random: random,
    ratioArray: ratioArray,
    byRatio: byRatio,
    randomArray: randomArray
  };


  /* istanbul ignore else */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = randomValues;
  } else {
    /*eslint-disable */
    window.randomValues = randomValues;
    /*eslint-enable */
  }
})();
