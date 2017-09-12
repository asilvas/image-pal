'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getOptions = require('./shared/get-options');
var getColors = require('./shared/get-colors');

var _require = require('hsluv'),
    rgbToHsluv = _require.rgbToHsluv;

module.exports = function (imageData, _ref) {
  var applyColor = _ref.applyColor,
      colorPlacer = _ref.colorPlacer,
      options = _objectWithoutProperties(_ref, ['applyColor', 'colorPlacer']);

  var opts = {
    applyColor: applyColor || hsluvColor,
    colorPlacer: colorPlacer || hsluvColorPlacer,
    ...getOptions(options)
  };
  return getColors(imageData, opts);
};

function hsluvColor(c) {
  c.hsluv = rgbToHsluv([c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256]);
}

function hsluvColorPlacer(c) {
  var tooLightOrDark = c.hsluv[2] < 8 || c.hsluv[2] > 97;
  return [tooLightOrDark ? 0 : c.hsluv[0] / 360, tooLightOrDark ? 0 : c.hsluv[1] / 100, c.hsluv[2] / 100];
}