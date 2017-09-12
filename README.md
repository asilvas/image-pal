# Intro

Retrieve [human perceivable](https://en.wikipedia.org/wiki/CIELUV) palette of colors from images leveraging color quantization. What sets Image-Pal apart
from other image-based color palette generators is that you can [easily plugin other color spaces](#custom-color-spaces) (or variations of existing)
to achieve the desired palette.

![NPM](https://raw.githubusercontent.com/asilvas/image-pal/master/docs/colorcube.png)


## Usage

Built-in support for RGB and HSLuv color spaces. Or [easily plugin other color spaces](#custom-color-spaces).

```
  const getColors = require('image-pal/lib/hsluv');
  // OR if you want the non-human-perceptual version based on pure RGB
  // const getColors = require('image-pal/lib/rgb');
  
  const colors = getColors(myImageBytes, options);
  colors.forEach(color => {
    console.log(color.rgb); // [ 100, 100, 100 ]
    console.log(color.alpha); // 255
    console.log(color.hex); // #abc123
    // below props only available if using `hsluv` version
    console.log(color.hsluv); // [ 1, 50, 100 ]
  });
```


## Helpers

Depending how you intend to access the images, there are a few high-performance recommendations:

* [image-pal-canvas](https://github.com/asilvas/image-pal-canvas) - A browser based implementation that leverages `Image` and `Canvas` for fast palette generation.
* [image-pal-sharp](https://github.com/asilvas/image-pal-sharp) - A Node.js based implementation that leverages `Sharp` and `libvips` for fast palette generation.
* [image-steam](https://github.com/asilvas/node-image-steam) - An Image API with built-in support, already optimized for you.

By leveraging browser and server implementations you can provide consistent (though NOT identical) palette generation across your stack. Generated palettes will still vary
slightly as the image resize operations vary in algorithm across browsers and server implementations. If consistency is critical you might consider one of the
server-only solutions.


## Options

| Name | Type | Default | Desc |
| --- | --- | --- | --- |
| hasAlpha | Boolean | *required* | If input has alpha it'll read 4-byte colors instead of the default 3 |
| maxColors | Number | `10` | Maximum size of colors to return. *Only one* is garuanteed |
| minDensity | Number | `0.005` | Minimum cell density (0.5%) required to be considered a valid palette color |
| cubicCells | Number | `4` | Number of cells per dimension in 3d space. Higher number of cells increases cpu time but can be useful if you want to return a large palette (greater than 10 maxColors). Only (3^3=27) or (4^3=64) supported |
| mean | Boolean | `true` | By default the mean color will be computed which is generally desired. If set to `false` the median color will be selected. |
| order | String | `distance` | Order of the returned color palette. By default will be ordered based on the distance between colors. Or `density` if cell density is desired. |


### Logos

In the case you're working with a logo where brand is everything, disabling `mean` to select the median color will avoid tampering with brand colors.

`{ mean: false }`


## Performance

While this library is light weight, if it's used with very large images it can still take a considerable amount of time. See [Helpers](#helpers) for high-performance production usage.


## Custom Color Spaces

It's quite simple to leverage a different color space or a variation of the provided color spaces (RGB or HSLuv).

```
  const getColors = require('image-pal/lib/rgb'); // extend rgb generator
  
  function rgbColorPlacer(c) {
    // instead, I could convert RGB to an alternate color space, OR change the placement logic within the RGB spectrum
    return [
      c.rgb[0] / 256, // x=0-1
      c.rgb[1] / 256, // y=0-1
      c.rgb[2] / 256 // z=0-1
    ];
  }

  const colors = getColors(myImageBytes, { colorPlacer: rgbColorPlacer });
  // do something with colors...
```
