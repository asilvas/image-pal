'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const lib = require('../../src/shared/get-options');

describe('#src/shared/get-options.js', function () {

  let options, ret;

  beforeEach(function () {
    options = {
      hasAlpha: false
    };

  });

  it('No options throws hasAlpha error', function () {
    options = undefined;
    try {
      ret = lib(options);
      throw new Error('shouldn\'t make it this far');
    } catch (ex) {
      expect(ex.message).to.equal('options.hasAlpha is required');
    }
  });

  it('hasAlpha is required', function () {
    options = {};
    try {
      ret = lib(options);
      throw new Error('shouldn\'t make it this far');
    } catch (ex) {
      expect(ex.message).to.equal('options.hasAlpha is required');
    }
  });
  
  it('default options', function () {
    ret = lib(options);
    expect(ret).to.deep.equal({ hasAlpha: false, maxColors: 10, minDensity: 0.005, mean: true, cubicCells: 4, order: 'distance' });
  });
  
});
