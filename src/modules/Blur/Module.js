/*
 * Blur an Image
 */
 module.exports = function Blur(options,UI){
     options = options || {};
     options.title = "Blur";
     options.description = "Blur an Image";
     options.blur = options.blur || 2

     //Tell the UI that a step has been set up
     UI.onSetup(options.step);
     var output;

     function draw(input,callback){

         // Tell the UI that a step is being drawn
         UI.onDraw(options.step);

         var step = this;

         function extraManipulation(pixels){
           return pixels = require('ndarray-gaussian-filter')(pixels,options.blur)
         }


         function output(image,datauri,mimetype){

             // This output is accessible by Image Sequencer
             step.output = {src:datauri,format:mimetype};

             // This output is accessible by UI
             options.step.output = datauri;

             // Tell UI that step has been drawn.
             UI.onComplete(options.step);
         }

         return require('../_nomodule/PixelManipulation.js')(input, {
             output: output,
             extraManipulation: extraManipulation,
             format: input.format,
             image: options.image,
             callback: callback
         });

     }
     return {
         options: options,
         draw:  draw,
         output: output,
         UI: UI
     }
 }
