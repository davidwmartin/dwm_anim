function stepper(drawFrame, howManyFrames){
	
	// iterates as many times as there are frames
	for(i = 0; i < howManyFrames; i++) {
	
		// drawFrame should return current canvas object
		var _frame = drawFrame();
		exportFrame(_frame, i);
	}

	// finish function will shut down server, kick off processor, etc.
	finish();
}

// module.exports = stepper(howManyFrames);

module.exports = stepper;