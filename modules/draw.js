function draw(animation, rAF = true){

	// run whatever animation drawing function you pass in
	animation();

	if (rAF = true){
		// if this is meant to run in browser via requestAnimationFrame, get the next frame, continue the loop
		window.requestAnimationFrame(draw);
	}
	else{
		// otherwise we're likely in an export scenario, or only generating one frame. either way don't request another frame just yet
	}

}

module.exports = draw;