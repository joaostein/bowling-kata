'use strict';

var chai = require('chai');
var Bowling = require('./bowling');

/**
 * Chai Should syntax
 *
 * foo.should.be.a('string');
 * foo.should.equal('bar');
 * foo.should.have.length(3);
 * tea.should.have.property('flavors').with.length(3);
 *
 * Documentation: http://chaijs.com/guide/styles/#should
 */

// chai.should();

/**
 * Chai Expect syntax
 *
 * expect(foo).to.be.a('string');
 * expect(foo).to.equal('bar');
 * expect(foo).to.have.length(3);
 * expect(tea).to.have.property('flavors').with.length(3);
 *
 * Documentation: http://chaijs.com/guide/styles/#expect
 */

var expect = chai.expect;

describe('Bowling', function () {
  var b;
  beforeEach(function (done) {
    b = new Bowling();
    done();
  });

  it('should get result for a single frame', function (done) {
    expect(b.result('12')).to.equal(3);
    expect(b.result('1')).to.equal(1);
    expect(b.result('9-9-9-9-9-9-9-9-9-9-')).to.equal(90);
    done();
  });

  it('should get result for multiples throws', function (done) {
    expect(b.result('1251232211')).to.equal(20);
    expect(b.result('23')).to.equal(5);
    expect(b.result('12341234')).to.equal(20);
    done();
  });

  it('should get result for spare', function (done) {
    expect(b.result('5/12')).to.equal(14);
    expect(b.result('1/8/12')).to.equal(18 + 11 + 3);
    expect(b.result('2/')).to.equal(10);
    expect(b.result('5/')).to.equal(10);
    expect(b.result('5/5/1')).to.equal(15 + 11 + 1);
    expect(b.result('5/5/5/5/5/5/5/5/5/5/5')).to.equal((15 * 10));
    done();
  });

  it('should get result for strike', function (done) {
    expect(b.result('X-')).to.equal(10);
    expect(b.result('X-11')).to.equal(12 + 2);
    expect(b.result('X-15')).to.equal(16 + 6);
    expect(b.result('X-15X-90')).to.equal(16 + 6 + 19 + 9);

    expect(b.result('12X-')).to.equal(3 + 10);
    expect(b.result('X-X-')).to.equal(20 + 10);
    expect(b.result('2/X-')).to.equal(20 + 10);
    expect(b.result('X-X-X-')).to.equal(20 + 20 + 10);
    done();
  });

  it('should get two bonus throws if strike on last frame', function (done) {
    expect(b.result('112211221122112211X-22')).to.equal(2 + 4 + 2 + 4 + 2 + 4 + 2 + 4 + 2 + 14);
    expect(b.result('112211221122112211X-11')).to.equal(2 + 4 + 2 + 4 + 2 + 4 + 2 + 4 + 2 + 12);
    done();
  });

  it('should get one bonus throw if spare on last frame', function (done) {
    expect(b.result('1122112211221122119/1')).to.equal(2 + 4 + 2 + 4 + 2 + 4 + 2 + 4 + 2 + 11);
    done();
  });
});
