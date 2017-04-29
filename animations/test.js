var lib = require('../anim_lib/lib.js');

var animation = {
	name: 'sample',
	draw: drawAnimation, 
	continuous: false
}

// draw function for this animation -- this draws each frame
function drawAnimation(){
	
	var ctx = lib.canvas('canvas1');

	ctx.beginPath();
  ctx.arc(100, 100, 57, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();


	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	}
}


module.exports = animation;