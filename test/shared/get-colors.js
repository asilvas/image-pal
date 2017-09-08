'use strict';

const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;
const lib = require('../../lib/shared/get-colors');
const getOptions = require('../../lib/shared/get-options');

describe('#lib/shared/get-colors.js', function () {

  let options, bytes, ret;

  beforeEach(function () {
    bytes = [1, 2, 3];
    options = {
      hasAlpha: false,
      colorPlacer: sinon.stub().returns({ x: 0, y: 0, z: 0 })
    };
  });

  it('hasAlpha:true', function () {
    bytes = [1, 2, 3, 4];
    options.hasAlpha = true;
    ret = lib(bytes, getOptions(options));
    expect(ret.length).to.equal(1);
    expect(options.colorPlacer).to.have.been.calledOnce;
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
  
});
