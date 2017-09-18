/******
**** setup
******/

var exportFrame = require('./modules/export-frame'),
	animation = require('./animations/imagework/portals.js');


// When window loads, get errything started
console.log('index.js loaded');
var toVid = false; // uncomment for export
var howManyFrames = 1200; // if toVid = true
window.addEventListener("load", boomBoom(toVid));


/******
**** Fire animation function
******/

// uses window.requestAnimationFrame();
// super basic info: https://css-tricks.com/using-requestanimationframe/
// lengthy discussion: http://creativejs.com/resources/requestanimationframe/

function boomBoom(toVid){
	console.log('fired animation trigger from index.js');


	if (toVid == true){

		animation.continuous = false;

		// animation.setup();
		window.requestAnimationFrame(animation.setup);

		// TODO -- would prefer not to have to the setTimeout method but it seems necessary when dealing with images (otherwise draw function runs before images are fully loaded, and nothing happens)
		setTimeout(drawExport, 3000);

		function drawExport() {
			for(f = 0; f < howManyFrames; f++) {
				
				// drawFrame should return current canvas object
				var _frame = animation.draw();

				exportFrame(_frame, f);
			}
		}

	} else{
		// just run animation
		window.requestAnimationFrame(animation.setup);
	}

}


// TODO: do I need to export anything?
// module.exports = fireAnimation;
