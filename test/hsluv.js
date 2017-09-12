'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const lib = require('../src/hsluv');

describe('#src/hsluv.js', function () {

  let ret, bytes, options;

  beforeEach(function () {
    bytes = [];
    options = {
      hasAlpha: false,
      cubicCells: 3
    };

  });

  it('No colors if empty input', function () {
    ret = lib(bytes, options);
    expect(ret.length).to.equal(0);
  });

  it('Leverage linear split hsluvColorPlacer by default', function () {
    bytes = [0, 100, 255, 0, 100, 255, 255, 100, 0];
    ret = lib(bytes, options);
    expect(ret.length).to.equal(2);
    expect(ret[0].hex).to.equal('#ff6400');
    expect(ret[0].density).to.equal(1 / 3);
  });

  it('Leverage linear split hsluvColorPlacer by default', function () {
    bytes = [0, 100, 255];
    options.colorPlacer = sinon.stub().returns([ 0, 0, 0 ]);
    ret = lib(bytes, options);
    expect(ret.length).to.equal(1);
    expect(ret[0].hex).to.equal('#0064ff');
    expect(ret[0].density).to.equal(1);
    expect(options.colorPlacer).to.have.been.calledTwice;
  });
  
});
