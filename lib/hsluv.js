const getOptions = require('./shared/get-options');
const getColors = require('./shared/get-colors');
const { rgbToHsluv } = require('hsluv');

module.exports = (imageData, { applyColor, colorPlacer, ...options }) => {
  const opts = {
    applyColor: applyColor || hsluvColor,
    colorPlacer: colorPlacer || hsluvColorPlacer,
    ...getOptions(options)
  };
  return getColors(imageData, opts);
};

function hsluvColor(c) {
  c.hsluv = rgbToHsluv([ c.rgb[0] / 256, c.rgb[1] / 256, c.rgb[2] / 256 ]);
}

function hsluvColorPlacer(c) {
  const tooLightOrDark = c.hsluv[2] < 5 || c.hsluv[2] > 95;
  return {
    x: tooLightOrDark ? 0 : c.hsluv[0] / 360,
    y: tooLightOrDark ? 0 : c.hsluv[1] / 100,
    z: c.hsluv[2] / 100
  };
}
