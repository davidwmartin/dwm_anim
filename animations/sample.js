// require animation library
var lib = require('../anim_lib/lib.js');

// animation object
var animation = module.exports = {
	name: 'sample',
	continuous: true, 
	setup: setupAnimation,
	draw: drawFrame
}

// initial setup stuff that shouldn't get looped every time
function setupAnimation(){
	// create canvas
}


// draw function for this animation
function drawFrame(){

	// if continuous, keep looping via window.rAF
	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	}
}