"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getOptions = require('./shared/get-options');

var getColors = require('./shared/get-colors');

var _require = require('hsluv'),
    rgbToHsluv = _require.rgbToHsluv;

module.exports = function (imageData, _ref) {
  var applyColor = _ref.applyColor,
      colorPlacer = _ref.colorPlacer,
      options = _objectWithoutProperties(_ref, ["applyColor", "colorPlacer"]);

  var opts = _objectSpread({
    applyColor: applyColor || hsluvColor,
    colorPlacer: colorPlacer || hsluvColorPlacer
  }, getOptions(options));

  return getColors(imageData, opts);
};

function hsluvColor(c) {
  c.hsluv = rgbToHsluv([c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256]);
}

function hsluvColorPlacer(c) {
  var tooLightOrDark = c.hsluv[2] < 8 || c.hsluv[2] > 97;
  return [tooLightOrDark ? 0 : c.hsluv[0] / 360, tooLightOrDark ? 0 : c.hsluv[1] / 100, c.hsluv[2] / 100];
}