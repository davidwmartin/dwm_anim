var exportFrame = require('./export-frame.js');

function stepper(animation, howManyFrames){

	animation.setup();
	// iterates as many times as there are frames
	for(j = 0; j < howManyFrames; j++) {
		// drawFrame should return current canvas object
		var _frame = animation.draw();
		exportFrame(_frame, j);
	}

	// finish function will shut down server, kick off processor, etc.
	// finish();
}

module.exports = stepper;
