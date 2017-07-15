var fs = require('fs');


// takes frame data posted from frontend to server, converts that to a file and saves it somewhere.
var saveFrame = module.exports = function(postData){
	// return POSTed string to object
	posted = JSON.parse(postData);
	// get framedata, remove first bit of string so that only b64 image data is left
	var frameData = posted.frame.replace(/^data:image\/png;base64,/, "");
	// offset count by 1, pass through padding function to get consistent-length in frame names
	var frameCount = pad(posted.number + 1);
	console.log(frameCount);
	// format file path
	var filePath = 'output/frame' + frameCount + '.png';

	// TODO -- can / should I be doing this with streams?
	// fs.createWriteStream(filePath, 'base64').pipe(frameDataFormatted);

	fs.writeFile(filePath, frameData, {encoding: 'base64'}, function(err) {
	  if (err) {console.log(err);}
	  console.log('saved frame');
	});

}

function pad(n) {
	if (n < 10) {
		return "000" + n;
	}
	else if (n < 100) {
		return "00" + n;
	}
	else if (n < 1000) {
		return "0" + n;
	} else {
		return n;
	}
}