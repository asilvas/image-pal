'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getOptions = require('./shared/get-options');
var getColors = require('./shared/get-colors');

module.exports = function (imageData, _ref) {
  var colorPlacer = _ref.colorPlacer,
      options = _objectWithoutProperties(_ref, ['colorPlacer']);

  var opts = _extends({
    colorPlacer: colorPlacer || rgbColorPlacer
  }, getOptions(options));
  return getColors(imageData, opts);
};

function rgbColorPlacer(c) {
  return [c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256];
}