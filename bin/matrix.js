const matrix = require('rpi-led-matrix');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const MatrixDisplay = new matrix.LedMatrix(
    {
        ...matrix.LedMatrix.defaultMatrixOptions(),
        rows: 64,
        cols: 64,
        chainLength: 1,
        //hardwareMapping: matrix.GpioMapping.Regular,
        //pixelMapperConfig: matrix.LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
    },
    {
        ...matrix.LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 4,
    }
);

MatrixDisplay
    .clear()            // clear the display
    .brightness(100)    // set the panel brightness to 100%
    .fgColor(0x0000FF)  // set the active color to blue
    .fill()             // color the entire diplay blue
    .fgColor(0xFFFF00)  // set the active color to yellow
    // draw a yellow circle around the display
    .drawCircle(MatrixDisplay.width() / 2, MatrixDisplay.height() / 2, MatrixDisplay.width() / 2 - 1)
    // draw a yellow rectangle
    .drawRect(MatrixDisplay.width() / 4, MatrixDisplay.height() / 4, MatrixDisplay.width() / 2, MatrixDisplay.height() / 2)
    // sets the active color to red
    .fgColor({ r: 255, g: 0, b: 0 })
    // draw two diagonal red lines connecting the corners
    .drawLine(0, 0, MatrixDisplay.width(), MatrixDisplay.height())
    .drawLine(MatrixDisplay.width() - 1, 0, 0, MatrixDisplay.height() - 1)
    .sync();

sleep(10000).then(() => {
    console.log("rdy")// This will execute 10 seconds from now
});

