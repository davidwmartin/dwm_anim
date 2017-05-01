// var base64 = require('node-base64-image');
var fs = require('fs');


// takes frame data posted from frontend to server, converts that to a file and saves it somewhere.
var saveFrame = module.exports = function(frameData){
	// console.log(frameData.toString());
	var frameDataFormatted = frameData.toString();
	// console.log(frameDataFormatted);
	// base64.decode(frameData,{
	// 	filename: 'frame',

	// });

	// var frameDataFormatted = req.rawBody.replace(/^data:image\/png;base64,/, "");

	// fs.createWriteStream('out.png').pipe(frameDataFormatted);

	fs.writeFile("frame.png", frameDataFormatted, {encoding: 'utf-8'}, function(err) {
	  if (err) {console.log(err);}
	  console.log('saved frame');
	});

}