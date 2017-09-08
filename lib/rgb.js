const getOptions = require('./shared/get-options');
const getColors = require('./shared/get-colors');

module.exports = (imageData, { colorPlacer, ...options }) => {
  const opts = {
    colorPlacer: colorPlacer || rgbColorPlacer,
    ...getOptions(options)
  };
  return getColors(imageData, opts);
};

function rgbColorPlacer(c) {
  return [
    c.rgb[0] / 256,
    c.rgb[1] / 256,
    c.rgb[2] / 256
  ];
}
