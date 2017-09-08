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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var hasAlpha = _ref.hasAlpha,
      maxColors = _ref.maxColors,
      minDensity = _ref.minDensity,
      maxDensity = _ref.maxDensity,
      cubicCells = _ref.cubicCells,
      mean = _ref.mean,
      otherOptions = _objectWithoutProperties(_ref, ['hasAlpha', 'maxColors', 'minDensity', 'maxDensity', 'cubicCells', 'mean']);

  if (typeof hasAlpha !== 'boolean') throw new Error('options.hasAlpha is required');

  var options = _extends({
    hasAlpha: hasAlpha,
    maxColors: Math.min(Math.max(1, maxColors), 20) || 10,
    minDensity: Math.min(Math.max(0.001, minDensity), 1) || 0.005,
    //maxDensity: maxDensity === false ? false : (Math.min(Math.max(0.001, maxDensity), 1) || false),
    cubicCells: Math.min(Math.max(3, cubicCells), 4) || 4,
    mean: mean === false ? false : true
  }, otherOptions);

  return options;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (imageData, _ref) {
  var hasAlpha = _ref.hasAlpha,
      maxColors = _ref.maxColors,
      minDensity = _ref.minDensity,
      maxDensity = _ref.maxDensity,
      cubicCells = _ref.cubicCells,
      mean = _ref.mean,
      applyColor = _ref.applyColor,
      colorPlacer = _ref.colorPlacer;

  // pre-allocate cells3d[x][y][z]
  // pre-allocate cells[i]
  var x = void 0,
      y = void 0,
      z = void 0,
      i = void 0,
      cell = void 0;
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

  var bytesPerPixel = hasAlpha ? 4 : 3;

  // color placement
  var byte = void 0,
      color = void 0;
  var pixels = Math.floor(imageData.length / bytesPerPixel);
  for (i = 0; i < pixels; i++) {
    byte = i * bytesPerPixel;
    color = {
      rgb: [imageData[byte], imageData[byte + 1], imageData[byte + 2]],
      alpha: hasAlpha ? imageData[byte + 3] : 255
    };

    if (applyColor) applyColor(color); // apply any color logic, if any
    var cellInfo = findCell(colorPlacer(color), cubicCells);
    cells3d[cellInfo.x][cellInfo.y][cellInfo.z].push(color);
  }

  // sort cells
  cells.sort(function (a, b) {
    return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
  });

  // compute cell densities
  var cellDensities = cells.map(function (colors) {
    return {
      density: colors.length / pixels,
      colors: colors
    };
  });

  // remove cells that don't meet min criteria
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
  }
  */

  // adhere to maxColors
  if (cellDensities.length > maxColors) {
    cellDensities = cellDensities.slice(0, maxColors);
  }

  // with remaining cells that match critera, extract mean or median colors
  var palette = cellDensities.map(function (cellData) {
    if (mean) {
      // apply mean calculations
      var sumRgb = cellData.colors.reduce(function (state, c) {
        state.r += c.rgb[0];
        state.g += c.rgb[1];
        state.b += c.rgb[2];
        return state;
      }, { r: 0, g: 0, b: 0 });
      var len = cellData.colors.length;
      color = {
        rgb: [Math.min(255, Math.round(sumRgb.r / len)), Math.min(255, Math.round(sumRgb.g / len)), Math.min(255, Math.round(sumRgb.b / len))],
        alpha: cellData.colors[0].alpha // dumb alpha copy
      };
      if (applyColor) applyColor(color); // update if color applicator provided
    } else {
      // grab median color
      color = cellData.colors[Math.floor(cellData.colors.length / 2)];
    }

    // attach hex colors for final palette
    color.hex = rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2]);
    color.density = cellData.density;

    return color;
  });

  return palette;
};

function findCell(placement, cubicCells) {
  return {
    x: Math.max(0, Math.ceil(Math.min(placement.x, 1) * cubicCells) - 1),
    y: Math.max(0, Math.ceil(Math.min(placement.y, 1) * cubicCells) - 1),
    z: Math.max(0, Math.ceil(Math.min(placement.z, 1) * cubicCells) - 1)
  };
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hsluv = __webpack_require__(5);

var _hsluv2 = _interopRequireDefault(_hsluv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.imagePalHsluv = _hsluv2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getOptions = __webpack_require__(0);
var getColors = __webpack_require__(1);

var _require = __webpack_require__(6),
    rgbToHsluv = _require.rgbToHsluv;

module.exports = function (imageData, _ref) {
  var applyColor = _ref.applyColor,
      colorPlacer = _ref.colorPlacer,
      options = _objectWithoutProperties(_ref, ['applyColor', 'colorPlacer']);

  var opts = _extends({
    applyColor: applyColor || hsluvColor,
    colorPlacer: colorPlacer || hsluvColorPlacer
  }, getOptions(options));
  return getColors(imageData, opts);
};

function hsluvColor(c) {
  c.hsluv = rgbToHsluv([c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256]);
}

function hsluvColorPlacer(c) {
  var tooLightOrDark = c.hsluv[2] < 5 || c.hsluv[2] > 95;
  return {
    x: tooLightOrDark ? 0 : c.hsluv[0] / 360,
    y: tooLightOrDark ? 0 : c.hsluv[1] / 100,
    z: c.hsluv[2] / 100
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
var hsluv = hsluv || {};
hsluv.Geometry = function() { };
hsluv.Geometry.intersectLineLine = function(a,b) {
	var x = (a.intercept - b.intercept) / (b.slope - a.slope);
	var y = a.slope * x + a.intercept;
	return { x : x, y : y};
};
hsluv.Geometry.distanceFromOrigin = function(point) {
	return Math.sqrt(Math.pow(point.x,2) + Math.pow(point.y,2));
};
hsluv.Geometry.distanceLineFromOrigin = function(line) {
	return Math.abs(line.intercept) / Math.sqrt(Math.pow(line.slope,2) + 1);
};
hsluv.Geometry.perpendicularThroughPoint = function(line,point) {
	var slope = -1 / line.slope;
	var intercept = point.y - slope * point.x;
	return { slope : slope, intercept : intercept};
};
hsluv.Geometry.angleFromOrigin = function(point) {
	return Math.atan2(point.y,point.x);
};
hsluv.Geometry.normalizeAngle = function(angle) {
	var m = 2 * Math.PI;
	return (angle % m + m) % m;
};
hsluv.Geometry.lengthOfRayUntilIntersect = function(theta,line) {
	return line.intercept / (Math.sin(theta) - line.slope * Math.cos(theta));
};
hsluv.Hsluv = function() { };
hsluv.Hsluv.getBounds = function(L) {
	var result = [];
	var sub1 = Math.pow(L + 16,3) / 1560896;
	var sub2;
	if(sub1 > hsluv.Hsluv.epsilon) sub2 = sub1; else sub2 = L / hsluv.Hsluv.kappa;
	var _g = 0;
	while(_g < 3) {
		var c = _g++;
		var m1 = hsluv.Hsluv.m[c][0];
		var m2 = hsluv.Hsluv.m[c][1];
		var m3 = hsluv.Hsluv.m[c][2];
		var _g1 = 0;
		while(_g1 < 2) {
			var t = _g1++;
			var top1 = (284517 * m1 - 94839 * m3) * sub2;
			var top2 = (838422 * m3 + 769860 * m2 + 731718 * m1) * L * sub2 - 769860 * t * L;
			var bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t;
			result.push({ slope : top1 / bottom, intercept : top2 / bottom});
		}
	}
	return result;
};
hsluv.Hsluv.maxSafeChromaForL = function(L) {
	var bounds = hsluv.Hsluv.getBounds(L);
	var min = 1.7976931348623157e+308;
	var _g = 0;
	while(_g < 2) {
		var i = _g++;
		var length = hsluv.Geometry.distanceLineFromOrigin(bounds[i]);
		min = Math.min(min,length);
	}
	return min;
};
hsluv.Hsluv.maxChromaForLH = function(L,H) {
	var hrad = H / 360 * Math.PI * 2;
	var bounds = hsluv.Hsluv.getBounds(L);
	var min = 1.7976931348623157e+308;
	var _g = 0;
	while(_g < bounds.length) {
		var bound = bounds[_g];
		++_g;
		var length = hsluv.Geometry.lengthOfRayUntilIntersect(hrad,bound);
		if(length >= 0) min = Math.min(min,length);
	}
	return min;
};
hsluv.Hsluv.dotProduct = function(a,b) {
	var sum = 0;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		sum += a[i] * b[i];
	}
	return sum;
};
hsluv.Hsluv.fromLinear = function(c) {
	if(c <= 0.0031308) return 12.92 * c; else return 1.055 * Math.pow(c,0.416666666666666685) - 0.055;
};
hsluv.Hsluv.toLinear = function(c) {
	if(c > 0.04045) return Math.pow((c + 0.055) / 1.055,2.4); else return c / 12.92;
};
hsluv.Hsluv.xyzToRgb = function(tuple) {
	return [hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[0],tuple)),hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[1],tuple)),hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[2],tuple))];
};
hsluv.Hsluv.rgbToXyz = function(tuple) {
	var rgbl = [hsluv.Hsluv.toLinear(tuple[0]),hsluv.Hsluv.toLinear(tuple[1]),hsluv.Hsluv.toLinear(tuple[2])];
	return [hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[0],rgbl),hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[1],rgbl),hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[2],rgbl)];
};
hsluv.Hsluv.yToL = function(Y) {
	if(Y <= hsluv.Hsluv.epsilon) return Y / hsluv.Hsluv.refY * hsluv.Hsluv.kappa; else return 116 * Math.pow(Y / hsluv.Hsluv.refY,0.333333333333333315) - 16;
};
hsluv.Hsluv.lToY = function(L) {
	if(L <= 8) return hsluv.Hsluv.refY * L / hsluv.Hsluv.kappa; else return hsluv.Hsluv.refY * Math.pow((L + 16) / 116,3);
};
hsluv.Hsluv.xyzToLuv = function(tuple) {
	var X = tuple[0];
	var Y = tuple[1];
	var Z = tuple[2];
	var divider = X + 15 * Y + 3 * Z;
	var varU = 4 * X;
	var varV = 9 * Y;
	if(divider != 0) {
		varU /= divider;
		varV /= divider;
	} else {
		varU = NaN;
		varV = NaN;
	}
	var L = hsluv.Hsluv.yToL(Y);
	if(L == 0) return [0,0,0];
	var U = 13 * L * (varU - hsluv.Hsluv.refU);
	var V = 13 * L * (varV - hsluv.Hsluv.refV);
	return [L,U,V];
};
hsluv.Hsluv.luvToXyz = function(tuple) {
	var L = tuple[0];
	var U = tuple[1];
	var V = tuple[2];
	if(L == 0) return [0,0,0];
	var varU = U / (13 * L) + hsluv.Hsluv.refU;
	var varV = V / (13 * L) + hsluv.Hsluv.refV;
	var Y = hsluv.Hsluv.lToY(L);
	var X = 0 - 9 * Y * varU / ((varU - 4) * varV - varU * varV);
	var Z = (9 * Y - 15 * varV * Y - varV * X) / (3 * varV);
	return [X,Y,Z];
};
hsluv.Hsluv.luvToLch = function(tuple) {
	var L = tuple[0];
	var U = tuple[1];
	var V = tuple[2];
	var C = Math.sqrt(U * U + V * V);
	var H;
	if(C < 0.00000001) H = 0; else {
		var Hrad = Math.atan2(V,U);
		H = Hrad * 180.0 / 3.1415926535897932;
		if(H < 0) H = 360 + H;
	}
	return [L,C,H];
};
hsluv.Hsluv.lchToLuv = function(tuple) {
	var L = tuple[0];
	var C = tuple[1];
	var H = tuple[2];
	var Hrad = H / 360.0 * 2 * Math.PI;
	var U = Math.cos(Hrad) * C;
	var V = Math.sin(Hrad) * C;
	return [L,U,V];
};
hsluv.Hsluv.hsluvToLch = function(tuple) {
	var H = tuple[0];
	var S = tuple[1];
	var L = tuple[2];
	if(L > 99.9999999) return [100,0,H];
	if(L < 0.00000001) return [0,0,H];
	var max = hsluv.Hsluv.maxChromaForLH(L,H);
	var C = max / 100 * S;
	return [L,C,H];
};
hsluv.Hsluv.lchToHsluv = function(tuple) {
	var L = tuple[0];
	var C = tuple[1];
	var H = tuple[2];
	if(L > 99.9999999) return [H,0,100];
	if(L < 0.00000001) return [H,0,0];
	var max = hsluv.Hsluv.maxChromaForLH(L,H);
	var S = C / max * 100;
	return [H,S,L];
};
hsluv.Hsluv.hpluvToLch = function(tuple) {
	var H = tuple[0];
	var S = tuple[1];
	var L = tuple[2];
	if(L > 99.9999999) return [100,0,H];
	if(L < 0.00000001) return [0,0,H];
	var max = hsluv.Hsluv.maxSafeChromaForL(L);
	var C = max / 100 * S;
	return [L,C,H];
};
hsluv.Hsluv.lchToHpluv = function(tuple) {
	var L = tuple[0];
	var C = tuple[1];
	var H = tuple[2];
	if(L > 99.9999999) return [H,0,100];
	if(L < 0.00000001) return [H,0,0];
	var max = hsluv.Hsluv.maxSafeChromaForL(L);
	var S = C / max * 100;
	return [H,S,L];
};
hsluv.Hsluv.rgbToHex = function(tuple) {
	var h = "#";
	var _g1 = 0;
	var _g = tuple.length;
	while(_g1 < _g) {
		var i = _g1++;
		var chan = tuple[i];
		h += StringTools.hex(Math.round(chan * 255),2).toLowerCase();
	}
	return h;
};
hsluv.Hsluv.hexToRgb = function(hex) {
	hex = hex.toUpperCase();
	return [Std.parseInt("0x" + HxOverrides.substr(hex,1,2)) / 255.0,Std.parseInt("0x" + HxOverrides.substr(hex,3,2)) / 255.0,Std.parseInt("0x" + HxOverrides.substr(hex,5,2)) / 255.0];
};
hsluv.Hsluv.lchToRgb = function(tuple) {
	return hsluv.Hsluv.xyzToRgb(hsluv.Hsluv.luvToXyz(hsluv.Hsluv.lchToLuv(tuple)));
};
hsluv.Hsluv.rgbToLch = function(tuple) {
	return hsluv.Hsluv.luvToLch(hsluv.Hsluv.xyzToLuv(hsluv.Hsluv.rgbToXyz(tuple)));
};
hsluv.Hsluv.hsluvToRgb = function(tuple) {
	return hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hsluvToLch(tuple));
};
hsluv.Hsluv.rgbToHsluv = function(tuple) {
	return hsluv.Hsluv.lchToHsluv(hsluv.Hsluv.rgbToLch(tuple));
};
hsluv.Hsluv.hpluvToRgb = function(tuple) {
	return hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hpluvToLch(tuple));
};
hsluv.Hsluv.rgbToHpluv = function(tuple) {
	return hsluv.Hsluv.lchToHpluv(hsluv.Hsluv.rgbToLch(tuple));
};
hsluv.Hsluv.hsluvToHex = function(tuple) {
	return hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hsluvToRgb(tuple));
};
hsluv.Hsluv.hpluvToHex = function(tuple) {
	return hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hpluvToRgb(tuple));
};
hsluv.Hsluv.hexToHsluv = function(s) {
	return hsluv.Hsluv.rgbToHsluv(hsluv.Hsluv.hexToRgb(s));
};
hsluv.Hsluv.hexToHpluv = function(s) {
	return hsluv.Hsluv.rgbToHpluv(hsluv.Hsluv.hexToRgb(s));
};
hsluv.Hsluv.m = [[3.240969941904521,-1.537383177570093,-0.498610760293],[-0.96924363628087,1.87596750150772,0.041555057407175],[0.055630079696993,-0.20397695888897,1.056971514242878]];
hsluv.Hsluv.minv = [[0.41239079926595,0.35758433938387,0.18048078840183],[0.21263900587151,0.71516867876775,0.072192315360733],[0.019330818715591,0.11919477979462,0.95053215224966]];
hsluv.Hsluv.refY = 1.0;
hsluv.Hsluv.refU = 0.19783000664283;
hsluv.Hsluv.refV = 0.46831999493879;
hsluv.Hsluv.kappa = 903.2962962;
hsluv.Hsluv.epsilon = 0.0088564516;
var root = {
    "hsluvToRgb": hsluv.Hsluv.hsluvToRgb,
    "rgbToHsluv": hsluv.Hsluv.rgbToHsluv,
    "hpluvToRgb": hsluv.Hsluv.hpluvToRgb,
    "rgbToHpluv": hsluv.Hsluv.rgbToHpluv,
    "hsluvToHex": hsluv.Hsluv.hsluvToHex,
    "hexToHsluv": hsluv.Hsluv.hexToHsluv,
    "hpluvToHex": hsluv.Hsluv.hpluvToHex,
    "hexToHpluv": hsluv.Hsluv.hexToHpluv
};// CommonJS module system (including Node)
if (true) {
    module['exports'] = root;
}

// AMD module system
if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (root),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// Export to browser
if (typeof window !== 'undefined') {
    window['hsluv'] = root;
}
})();


/***/ })
/******/ ]);
//# sourceMappingURL=image-pal-hsluv.js.map