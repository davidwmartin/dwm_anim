/******
**** setup
******/

var stepper = require('./modules/stepper'),
		animation = require('./animations/lindsay.js');


// When window loads, get errything started
console.log('index.js loaded');
var toVid = false; // uncomment for export
var howManyFrames = 900; // if toVid = true
window.addEventListener("load", boomBoom(toVid));



/******
**** play animation loop (browser)
******/

// uses window.requestAnimationFrame();
// super basic info: https://css-tricks.com/using-requestanimationframe/
// lengthy discussion: http://creativejs.com/resources/requestanimationframe/
// TODO: add rAF polyfill for super old browsers

// NOTE -- this strategy will require webpack or browserify or something similar so that I can utilize the above required files in a browser context

function playAnimation(){
	console.log('called playAnimation()');
	window.requestAnimationFrame(animation.setup);
	// TODO -- this seems jank -- not sure why I have to call window.rAF on the setup function, but calling just animation.setup() causes the createCanvas function to fail when it can't find the body element 
	window.requestAnimationFrame(animation.draw);
}

/******
**** export animation loop (create a video)
******/

function exportAnimation(){
	console.log('called exportAnimation()');
	// indicate that this is not a continous animation (which would be iterated using window.requestAnimationFrame)
	animation.continuous = false;

	// pass the animation's draw function and the number of frames you want to export to the manual stepper
	stepper(animation, howManyFrames);
}

/******
**** execute function
******/

function boomBoom(toVid = false){
	console.log('boom boom we got some room');
	if(toVid == true){
		// TODO -- clear output folder here before exporting new frames
		// TODO -- consider fixing canvas size in "export mode" to prevent having to convert / crop in ffpmeg?
		exportAnimation();
	}
	else{
		playAnimation();
	}
}

// TODO: do I need to export anything?
// module.exports = boomBoom;
