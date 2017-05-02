/******
**** setup
******/

var stepper = require('./modules/stepper'),
		animation = require('./animations/test.js');


// When window loads, get errything started
console.log('index.js loaded');
window.addEventListener("load", boomBoom());



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
	// TODO: set desired number of frames variable somewhere (also framerate?)
	var howManyFrames = 100;
	stepper(animation, howManyFrames);
}

/******
**** execute function
******/

function boomBoom(toVid = true){
	console.log('boom boom we got some room');
	if(toVid == true){
		exportAnimation();
	}
	else{
		playAnimation();
	}
}

// TODO: do I need to export anything?
// module.exports = boomBoom;
