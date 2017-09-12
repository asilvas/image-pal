module.exports = ({ hasAlpha, maxColors, minDensity, /*maxDensity,*/ cubicCells, mean, order, ...otherOptions } = {}) => {
  if (typeof hasAlpha !== 'boolean') throw new Error('options.hasAlpha is required');
  
  const options = {
    hasAlpha,
    maxColors: Math.min(Math.max(1, maxColors), 32) || 10,
    minDensity: Math.min(Math.max(0.001, minDensity), 1) || 0.005,
    //maxDensity: maxDensity === false ? false : (Math.min(Math.max(0.001, maxDensity), 1) || false),
    cubicCells: Math.min(Math.max(3, cubicCells), 4) || 4,
    mean: mean === false ? false : true,
    order: order === 'density' ? order : 'distance',
    ...otherOptions // forward
  };

  return options;
};
