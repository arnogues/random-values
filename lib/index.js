'use strict';

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
 * @name byRatio
 * @param source
 * @returns {Array}
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
 *   });
 *
 *   => [1,1,1,2,2,3,3,3,3]
 */
function ratioArray(source) {
  var newArray = [];
  var key;
  for (key in source) {
    if (source.hasOwnProperty(key)) {
      newArray = newArray.concat(new Array(source[key] + 1).join(',' + key).split(',').slice(1));
    }
  }
  return newArray;
}


var byRatioStore = {};
/**
 * Return value by ratio
 * @param id
 * @param values
 * @returns {*}
 *
 * @example
 *
 */
function byRatio(id, values) {
  if(!byRatioStore[id]) {
    byRatioStore[id] = ratioArray(values);
  }
  return random(byRatioStore[id]);
}

module.exports = {
  random: random,
  ratioArray: ratioArray,
  byRatio: byRatio
};


