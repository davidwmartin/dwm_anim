// require animation library
var lib = require('../anim_lib/lib.js');

// animation object
var animation = module.exports = {
	name: 'sample',
	continuous: true, 
	setup: setupAnimation,
	draw: drawFrame, 
	persist: {} // TODO -- utilize persist object for anything that needs to be persisted between setup and draw functions while animation runs (context, currenct canvas, etc)
}

// initial setup stuff that shouldn't get looped every time
function setupAnimation(){
	// create canvas
	var ctx = animation.persist.ctx = lib.canvas.create('canvas1');

	window.requestAnimationFrame(animation.draw);
}


// draw function for this animation
function drawFrame(){
	var ctx = animation.persist.ctx;

	// if continuous, keep looping via window.rAF, otherwise return current canvas for saving
	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	} else {
		return ctx.canvas;
	}

}