var exportFrame = require('./export-frame.js');

function stepper(animation, howManyFrames){

	animation.setup();
	// iterates as many times as there are frames
	for(j = 0; j < howManyFrames; j++) {
		
		// drawFrame should return current canvas object
		// TODO -- this is brittle, I often forget and remove the return canvas; line from the animation draw functions. Need a better way of doing this. Also, this won't work when multiple canvases are in play...
		var _frame = animation.draw();
		exportFrame(_frame, j);
	}

	// finish function will shut down server, kick off processor, etc.
	// finish();
}

module.exports = stepper;
