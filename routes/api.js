var express = require('express');
var router = express.Router();
const fs = require('fs');
const {Font,LedMatrix,FontInstance,Color,LayoutUtils,HorizontalAlignment,VerticalAlignment} = require("rpi-led-matrix");

/**
 * Create Display.
 */
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

/**
 * Code to load Fonts
 * in file names B Stands for Bold and O for Cursive
 */
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

/**
 * Matrix Functions.
 */
function Clear(){
    matrix
        .clear()            // clear the display
}

function ShowText(text='No Input',backgroundcolor=0x000000,forgroundcolor=0xffffff,brighness=50,font='8x13',x=0, y=0, bold=false, Cursive=false){
    //set Background
    console.log('set background '+backgroundcolor.toString())
    matrix
        .brightness(brighness)
        .fgColor(backgroundcolor)
        .fill()
        .sync()
    //set font:
    var fontwidth = font.split('x')[0]
    var fonthight = font.split('x')[1]
    if (bold === true){
        if (font+'B' in FontList.keys()){
            font = font+'B'
        }
    }else if(Cursive === true) {
        if (font+'O' in FontList.keys()){
            font = font+'O'
        }
    }
    console.log('set font '+font.toString())
    //Calc Size
    text = text.replace('%20',' ')
    console.log('start point'+(matrix.height()/2-(fonthight/2)).toString())
    if (text.length*fontwidth <= matrix.width()){
        console.log('write text:' + text)
        matrix
            .fgColor(forgroundcolor)
            .font(FontList[font])
            .drawText(text,matrix.width()/2-((text.length*fontwidth)/2),matrix.height()/2-(fonthight/2))
            .sync()
    }
}

/**
 * API Endpoints
 */

router.get('/info', function(req, res, next) {
    res.send('Generall API Informations')
});

router.get('/', function(req, res, next) {
    res.render('apiinformations', { title: 'API Infos' });
});

router.put('/text/:text', function(req, res, next) {
    text = req.params.text
    console.log(req.query)
    console.log(req.query.B)
    if (req.query.Font !== undefined){font = req.query.Font}else {font = '8x13'}
    if (req.query.BGC !== undefined){backgroundcolor = parseInt(req.query.BGC)}else {backgroundcolor = 0x000000}
    if (req.query.FGC !== undefined){forgroundcolor = parseInt(req.query.FGC)}else {forgroundcolor=0xffffff}
    if (req.query.B !== undefined){brighness = parseInt(req.query.B)}else {brighness=50}
    if (req.query.Bold !== undefined){bold = req.query.Bold}else {bold=false}
    if (req.query.Cursive !== undefined){Cursive = req.query.Cursive}else {Cursive=false}
    try{
        ShowText(text,backgroundcolor,forgroundcolor,brighness,font,0,0,false,false)
        res.send('{"Statuscode":200,"Status":"Sucess"}')
    }
    catch{
        res.statusCode = 400
        res.send('{"Statuscode":400,"Status":"Error"}')
    }
    res.send('Generall API Informations')
});

module.exports = router;
