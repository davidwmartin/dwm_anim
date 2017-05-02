// var base64 = require('node-base64-image');
var fs = require('fs');


// takes frame data posted from frontend to server, converts that to a file and saves it somewhere.
var saveFrame = module.exports = function(postData){
	posted = JSON.parse(postData);
	var frameData = posted.frame.replace(/^data:image\/png;base64,/, "");
	var frameCount = posted.number;
	// console.log(posted.number);
	// console.log(frameData.toString());
	// console.log(Object.values(bObj));
	// var frameDataFormatted = b.toString().replace(/^data:image\/png;base64,/, "");
	// console.log(frameDataFormatted);
	var filePath = 'output/frame' + frameCount + '.png';
	// base64.decode(frameData,{
	// 	filename: 'frame',

	// });

	// var frameDataFormatted = req.rawBody.replace(/^data:image\/png;base64,/, "");

	// fs.createWriteStream(filePath, 'base64').pipe(frameDataFormatted);

	fs.writeFile(filePath, frameData, {encoding: 'base64'}, function(err) {
	  if (err) {console.log(err);}
	  console.log('saved frame');
	});

}