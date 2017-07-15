/******
**** setup
******/

var exportFrame = require('./modules/export-frame'),
	animation = require('./animations/particle-gravity-exp.js');


// When window loads, get errything started
console.log('index.js loaded');
var toVid = true; // uncomment for export
var howManyFrames = 10; // if toVid = true
window.addEventListener("load", boomBoom(toVid));


/******
**** Fire animation function
******/

// uses window.requestAnimationFrame();
// super basic info: https://css-tricks.com/using-requestanimationframe/
// lengthy discussion: http://creativejs.com/resources/requestanimationframe/

function boomBoom(toVid){
	console.log('fired animation trigger from index.js');
	animation.setup();

	if (toVid == true){
		
		animation.continuous = false;

		for(j = 0; j < howManyFrames; j++) {
		
			// drawFrame should return current canvas object
			// TODO -- this is brittle, I often forget and remove the return canvas; line from the animation draw functions. Need a better way of doing this. Also, this won't work when multiple canvases are in play...
			var _frame = animation.draw();
			exportFrame(_frame, j);
		}


	}

}


// TODO: do I need to export anything?
// module.exports = fireAnimation;
