var lib = require('../anim_lib/lib.js');

var animation = {
	name: 'sample',
	draw: drawAnimation, 
	continuous: false
}

// draw function for this animation -- this draws each frame
function drawAnimation(){
	
	lib.canvas();

	// console.log(canvas);

	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	}
}


module.exports = animation;