module.exports = (imageData, { hasAlpha, maxColors, minDensity, maxDensity, cubicCells, colorPlacer }) => {
  // pre-allocate cells3d[x][y][z]
  // pre-allocate cells[i]
  let x, y, z, i, cell;
  const cells3d = new Array(cubicCells);
  let cells = new Array(Math.pow(cubicCells, 3));
  for (x = 0, i = 0; x < cubicCells; x++) {
    cells3d[x] = new Array(cubicCells);
    for (y = 0; y < cubicCells; y++) {
      cells3d[x][y] = new Array(cubicCells);
      for (z = 0; z < cubicCells; z++, i++) {
        cells3d[x][y][z] = cells[i] = [];
      }
    }
  }

  const bytesPerPixel = hasAlpha ? 4 : 3;

  // color placement
  let byte, color;
  const pixels = Math.floor(imageData.length / bytesPerPixel);
  for (i = 0; i < pixels; i++) {
    byte = i * bytesPerPixel;
    color = {
      rgb: [ imageData[byte], imageData[byte + 1], imageData[byte + 2] ],
      alpha: hasAlpha ? imageData[byte + 3] : 255
    };

    const cellInfo = findCell(colorPlacer(color), cubicCells);
    cells3d[cellInfo.x][cellInfo.y][cellInfo.z].push(color);
  }

  // sort cells
  cells.sort((a, b) => a.length > b.length ? -1 : a.length < b.length ? 1 : 0);

  // compute cell densities
  let cellDensities = cells.map(colors => {
    return {
      density: (colors.length / pixels),
      colors
    };
  });

  // remove cells that don't meet min criteria
  cellDensities = cellDensities.filter(cellData => cellData.density >= minDensity);

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

  // with remaining cells that match critera, extract median colors
  const medianColors = cellDensities.map(cellData => {
    const colorIdx = Math.floor(cellData.colors.length / 2);
    const medianColor = cellData.colors[colorIdx];

    // attach hex colors for final palette
    medianColor.hex = rgbToHex(medianColor.rgb[0], medianColor.rgb[1], medianColor.rgb[2]);
    medianColor.density = cellData.density;

    return medianColor;
  });

  return medianColors;
};

function findCell(placement, cubicCells) {
  return {
    x: Math.max(0, Math.ceil(Math.min(placement.x, 1) * cubicCells) - 1),
    y: Math.max(0, Math.ceil(Math.min(placement.y, 1) * cubicCells) - 1),
    z: Math.max(0, Math.ceil(Math.min(placement.z, 1) * cubicCells) - 1)
  };
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
