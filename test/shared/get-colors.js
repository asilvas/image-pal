'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const lib = require('../../src/shared/get-colors');
const getOptions = require('../../src/shared/get-options');

describe('#src/shared/get-colors.js', function () {

  let options, bytes, ret;

  beforeEach(function () {
    bytes = [1, 2, 3];
    options = {
      hasAlpha: false,
      colorPlacer: sinon.stub().returns([ 0, 0, 0 ])
    };
  });

  it('hasAlpha:true', function () {
    bytes = [1, 2, 3, 4];
    options.hasAlpha = true;
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(1);
    expect(options.colorPlacer).to.have.been.called;
  });
  
  it('insufficient bytes', function () {
    bytes = [1, 2];
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(0);
    expect(options.colorPlacer).to.have.not.been.called;
  });

  it('median', function () {
    bytes = [0, 0, 0, 12, 12, 12, 18, 18, 18];
    options.mean = false;
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(1);
    expect(ret[0].rgb).to.be.deep.equal([12, 12, 12]);
  });

  it('mean', function () {
    bytes = [0, 0, 0, 12, 12, 12, 18, 18, 18];
    options.mean = true;
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(1);
    expect(ret[0].rgb).to.be.deep.equal([10, 10, 10]);
  });

  it('order:density', function () {
    bytes = [0, 0, 0, 0, 0, 0, 25, 155, 25];
    options.mean = false;
    options.order = 'density';
    options.colorPlacer = c => {
      return [
        c.rgb[0] / 256,
        c.rgb[1] / 256,
        c.rgb[2] / 256
      ];
    };
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(2);
    expect(ret[0].rgb).to.be.deep.equal([0, 0, 0]);
  });

  it('order:distance', function () {
    bytes = [0, 0, 0, 0, 0, 0, 25, 155, 25];
    options.mean = false;
    options.order = 'distance';
    options.colorPlacer = c => {
      return [
        c.rgb[0] / 256,
        c.rgb[1] / 256,
        c.rgb[2] / 256
      ];
    };
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(2);
    expect(ret[0].rgb).to.be.deep.equal([25, 155, 25]);
  });
  
});
