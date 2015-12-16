var random = require("../source/randomBetweenTwoNumbers.js");
var expect = require("chai").expect;
var assert = require('chai').assert;
var min,max;

describe('randomBetweenTwoNumbers', function () {
  it('should return number > -1000 and < 1000', function () {
    min = -1000;
    max = 1000;
    expect(random.randomize(min,max)).to.be.within(min,max);
  });

  it('should return number 2', function () {
    min = 2;
    max = min;
    expect(random.randomize(min,max)).to.be.within(min,max);
  });

  it('should return number = 1', function () {
    min = true;
    max = 1;
    expect(random.randomize(min,max)).to.equal(1);
  });

  it('should return number = 0', function () {
    min = false;
    max = 0;
    expect(random.randomize(min,max)).to.equal(0);
  });

  it('should return NaN', function () {
    min = {};
    max = NaN;
    assert.notOk(random.randomize(min,max));
  });
});