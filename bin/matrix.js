//const matrix = require('rpi-led-matrix');
const fs = require('fs');
const {Font,LedMatrix,FontInstance,Color,LayoutUtils,HorizontalAlignment,VerticalAlignment} = require("rpi-led-matrix");

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

//Create Display
const matrix = new LedMatrix(
    {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 64,
        cols: 64,
        chainLength: 1,
        //hardwareMapping: matrix.GpioMapping.Regular,
        //pixelMapperConfig: matrix.LedMatrixUtils.encodeMappers({ type: PixelMapperType.U }),
    },
    {
        ...LedMatrix.defaultRuntimeOptions(),
        gpioSlowdown: 4,
    }
);

//Code to load Fonts
var FontList = {};
fs.readdirSync(process.cwd()+'/fonts/').forEach(file =>{
    var fontname = file.substr(0,file.length-4)
    var fontpath = process.cwd()+'/fonts/'+file
    FontList[fontname] = new Font(fontname, fontpath)
})
if (FontList.length > 1){
    console.log('Error: No Fonts Found')
    process.exit(5)
}

//CODE:
function Clear(){
    matrix
        .clear()            // clear the display
}

function ShowText(backgroundcolor,forgroundcolor,brighness,text,font,x=0, y=0){
    matrix
        .brightness(brighness)
        .fgColor(backgroundcolor)
        .fill()
        .fgColor(forgroundcolor)
        .font(FontList[font])
        .drawText(text,x,y)
        .sync();
}

matrix
    .clear()            // clear the display
    /*.brightness(100)    // set the panel brightness to 100%
    .fgColor(0x0000FF)  // set the active color to blue
    .fill()             // color the entire diplay blue
    .fgColor(0xFFFF00)  // set the active color to yellow
    // draw a yellow circle around the display
    .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
    // draw a yellow rectangle
    .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
    // sets the active color to red
    .fgColor({ r: 255, g: 0, b: 0 })
    // draw two diagonal red lines connecting the corners
    .drawLine(0, 0, matrix.width(), matrix.height())
    .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1)*/
    .sync();

ShowText(0x0000FF,0xFFFF00,20,'HALlO','8x13');

sleep(50000).then(() => {
    console.log("")// This will execute 5 seconds from now
});
