'use strict';

var assert = require('assert');
var rv = require('../lib');

describe('random-values.random()', function () {
  it('should return random value from an array with one cell', function () {
    assert.equal(rv.random([1]), 1, 'we expect to have 1');
  });


  it('should return random value from an array with multiple cells', function () {
    var ok = true;
    var arr = [1, 2, 3, 4, 5];
    for (var i = 0; i < 1000; i++) {
      var value = rv.random(arr);
      if (!(value >= 1 && value <= 5)) {
        ok = false;
        break;
      }
    }

    assert.equal(rv.random([1]), 1, 'we expect to have 1');
  });

  it('should return random value between 2 numbers', function () {
    var ok = true;
    for (var i = 0; i < 1000; i++) {
      var value = rv.random(1, 3);
      if (!(value >= 1 && value <= 3)) {
        ok = false;
        break;
      }
    }
    assert(ok, 'we expect to have 1, i value = ' + i);
  });
});

describe('random-values.ratioArray()', function () {
  it('should return an array with item generated by ratio', function () {
    var arr = rv.ratioArray({
      'man': 3,
      'woman': 4
    });

    assert.deepEqual(arr, ['man', 'man', 'man', 'woman', 'woman', 'woman', 'woman'], 'we expect to have ["man", "man", "man", "woman", "woman", "woman", "woman"]');
  });
});

describe('random-values.byRatio()', function () {
  it('should return randomize rational values', function () {
    var value, i, man = 0, woman = 0,
      iterations = 1000000;


    for (i = 0; i < iterations; i++) {
      value = rv.byRatio('manwoman', {
        'man': 3,
        'woman': 7
      });

      switch (value) {
        case 'man' :
          man++;
          break;
        case 'woman':
          woman++;
          break;
      }
    }

    man = man / iterations;
    woman = woman / iterations;

    assert(man < 0.32 && woman > 0.69, 'we expect to have man less than 0.35 and woman more than 0.65');

  });

  it('should return randomize rational values with numbers', function () {
    var value, i,
      iterations = 1000000, r,
      results = [0, 0, 0, 0, 0];

    for (i = 0; i < iterations; i++) {
      value = rv.byRatio('numbers', {
        0: 25,
        1: 30,
        2: 15,
        3: 10,
        4: 20
      });

      results[value]++;
    }
    r = results.map(function (item) {
      return item / iterations;
    });

    assert(r[0] < 0.26 && r[1] < 0.31 && r[2] < 0.16 && r[3] < 0.11 && r[4] < 0.2, 'we expect to have number generated proportionnaly');
  });
});
