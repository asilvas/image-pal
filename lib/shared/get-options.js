"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var hasAlpha = _ref.hasAlpha,
      maxColors = _ref.maxColors,
      minDensity = _ref.minDensity,
      cubicCells = _ref.cubicCells,
      mean = _ref.mean,
      order = _ref.order,
      otherOptions = _objectWithoutProperties(_ref, ["hasAlpha", "maxColors", "minDensity", "cubicCells", "mean", "order"]);

  if (typeof hasAlpha !== 'boolean') throw new Error('options.hasAlpha is required');

  var options = _objectSpread({
    hasAlpha: hasAlpha,
    maxColors: Math.min(Math.max(1, maxColors), 32) || 10,
    minDensity: Math.min(Math.max(0.001, minDensity), 1) || 0.005,
    //maxDensity: maxDensity === false ? false : (Math.min(Math.max(0.001, maxDensity), 1) || false),
    cubicCells: Math.min(Math.max(3, cubicCells), 4) || 4,
    mean: mean === false ? false : true,
    order: order === 'density' ? order : 'distance'
  }, otherOptions);

  return options;
};