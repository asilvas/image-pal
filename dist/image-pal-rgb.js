/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack/rgb.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/rgb.js":
/*!********************!*\
  !*** ./lib/rgb.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var getOptions = __webpack_require__(/*! ./shared/get-options */ "./lib/shared/get-options.js");

var getColors = __webpack_require__(/*! ./shared/get-colors */ "./lib/shared/get-colors.js");

module.exports = function (imageData, _ref) {
  var colorPlacer = _ref.colorPlacer,
      options = _objectWithoutProperties(_ref, ["colorPlacer"]);

  var opts = _objectSpread({
    colorPlacer: colorPlacer || rgbColorPlacer
  }, getOptions(options));

  return getColors(imageData, opts);
};

function rgbColorPlacer(c) {
  return [c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256];
}

/***/ }),

/***/ "./lib/shared/get-colors.js":
/*!**********************************!*\
  !*** ./lib/shared/get-colors.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (imageData, _ref) {
  var hasAlpha = _ref.hasAlpha,
      maxColors = _ref.maxColors,
      minDensity = _ref.minDensity,
      cubicCells = _ref.cubicCells,
      mean = _ref.mean,
      order = _ref.order,
      applyColor = _ref.applyColor,
      colorPlacer = _ref.colorPlacer; // pre-allocate cells3d[x][y][z]
  // pre-allocate cells[i]

  var x, y, z, i, cell;
  var cells3d = new Array(cubicCells);
  var cells = new Array(Math.pow(cubicCells, 3));

  for (x = 0, i = 0; x < cubicCells; x++) {
    cells3d[x] = new Array(cubicCells);

    for (y = 0; y < cubicCells; y++) {
      cells3d[x][y] = new Array(cubicCells);

      for (z = 0; z < cubicCells; z++, i++) {
        cells3d[x][y][z] = cells[i] = [];
      }
    }
  }

  var bytesPerPixel = hasAlpha ? 4 : 3; // color placement

  var _byte, color;

  var pixels = Math.floor(imageData.length / bytesPerPixel);

  for (_byte = 0, i = 0; i < pixels; _byte += bytesPerPixel, i++) {
    color = {
      rgb: [imageData[_byte], imageData[_byte + 1], imageData[_byte + 2]],
      alpha: hasAlpha ? imageData[_byte + 3] : 255
    };
    if (applyColor) applyColor(color); // apply any color logic, if any

    color.xyz = colorPlacer(color);
    color.distance = getDistance(color);
    var xyz = findCell(color.xyz, cubicCells);
    cells3d[xyz[0]][xyz[1]][xyz[2]].push(color);
  } // sort cells


  cells.sort(function (a, b) {
    return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
  }); // compute cell densities

  var cellDensities = cells.map(function (colors) {
    return {
      density: colors.length / pixels,
      colors: colors
    };
  }); // remove cells that don't meet min criteria

  cellDensities = cellDensities.filter(function (cellData) {
    return cellData.density >= minDensity;
  });
  /* support for maxDensity is disabled for now -- not working as intended. might need a per-colour-space filter option
  if (maxDensity && cellDensities.length > 1 && cellDensities[0].density >= maxDensity) {
    // only filter if:
    // 1. maxDensity is enabled
    // 2. More than one cell exists
    // 3. Meets the maxDensity requirement
    // 4. Never filter more than the first matching cell
    cellDensities = cellDensities.slice(1); // remove first
  }*/
  // adhere to maxColors

  if (cellDensities.length > maxColors) {
    cellDensities = cellDensities.slice(0, maxColors);
  } // with remaining cells that match critera, extract mean or median colors


  var palette = cellDensities.map(function (cellData) {
    if (mean) {
      // apply mean calculations
      var sumRgb = cellData.colors.reduce(function (state, c) {
        state.r += c.rgb[0];
        state.g += c.rgb[1];
        state.b += c.rgb[2];
        return state;
      }, {
        r: 0,
        g: 0,
        b: 0
      });
      var len = cellData.colors.length;
      color = {
        rgb: [Math.min(255, Math.round(sumRgb.r / len)), Math.min(255, Math.round(sumRgb.g / len)), Math.min(255, Math.round(sumRgb.b / len))],
        alpha: cellData.colors[0].alpha // dumb alpha copy

      };
      if (applyColor) applyColor(color); // update if color applicator provided

      color.xyz = colorPlacer(color); // re-calc placement in 3d space
    } else {
      // grab median color
      // first we must sort based on distance

      /* istanbul ignore next */
      var colorsByDistance = cellData.colors.sort(function (a, b) {
        return a.distance > b.distance ? -1 : a.distance < b.distance ? 1 : 0;
      }); // now we can grab median

      color = colorsByDistance[Math.floor(cellData.colors.length / 2)];
    } // attach hex colors for final palette


    color.hex = rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2]);
    color.density = cellData.density;
    color.distance = getDistance(color);
    return color;
  });

  if (order === 'distance') {
    // sort by distance

    /* istanbul ignore next */
    palette = palette.sort(function (a, b) {
      return a.distance > b.distance ? -1 : a.distance < b.distance ? 1 : 0;
    });
  } // else, already sorted by density


  return palette;
};

function findCell(xyz, cubicCells) {
  return [Math.max(0, Math.ceil(Math.min(xyz[0], 1) * cubicCells) - 1), Math.max(0, Math.ceil(Math.min(xyz[1], 1) * cubicCells) - 1), Math.max(0, Math.ceil(Math.min(xyz[2], 1) * cubicCells) - 1)];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getDistance(color) {
  return color.distance = color.xyz[0] + color.xyz[1] * 10 + color.xyz[2] * 100;
} // https://www.compuphase.com/cmetric.htm

/*function distanceSorter(c1, c2) {
  const rmean = ( c1.rgb[0] + c2.rgb[0] ) / 2;
  const r = c1.rgb[0] - c2.rgb[0];
  const g = c1.rgb[1] - c2.rgb[1];
  const b = c1.rgb[2] - c2.rgb[2];
  return Math.sqrt((((512+rmean)*r*r)>>8) + 4*g*g + (((767-rmean)*b*b)>>8));
}*/

/***/ }),

/***/ "./lib/shared/get-options.js":
/*!***********************************!*\
  !*** ./lib/shared/get-options.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

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

/***/ }),

/***/ "./webpack/rgb.js":
/*!************************!*\
  !*** ./webpack/rgb.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_rgb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/rgb */ "./lib/rgb.js");
/* harmony import */ var _lib_rgb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_rgb__WEBPACK_IMPORTED_MODULE_0__);

window.imagePalRgb = _lib_rgb__WEBPACK_IMPORTED_MODULE_0___default.a;

/***/ })

/******/ });
//# sourceMappingURL=image-pal-rgb.js.map