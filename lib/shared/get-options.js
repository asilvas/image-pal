'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var hasAlpha = _ref.hasAlpha,
      maxColors = _ref.maxColors,
      minDensity = _ref.minDensity,
      cubicCells = _ref.cubicCells,
      mean = _ref.mean,
      order = _ref.order,
      otherOptions = _objectWithoutProperties(_ref, ['hasAlpha', 'maxColors', 'minDensity', 'cubicCells', 'mean', 'order']);

  if (typeof hasAlpha !== 'boolean') throw new Error('options.hasAlpha is required');

  var options = _extends({
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