/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var lib = __webpack_require__(5);

var animation = {
	name: 'sample',
	draw: drawAnimation,
	continuous: false
};

// draw function for this animation -- this draws each frame
function drawAnimation() {

	var ctx = lib.canvas('canvas1');

	ctx.beginPath();
	ctx.arc(100, 100, 57, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#003300';
	ctx.stroke();

	if (animation.continuous == true) {
		window.requestAnimationFrame(animation.draw);
	}
}

module.exports = animation;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function draw(animation, rAF = true) {

	// run whatever animation drawing function you pass in
	animation();

	if (rAF = true) {
		// if this is meant to run in browser via requestAnimationFrame, get the next frame, continue the loop
		window.requestAnimationFrame(draw);
	} else {
		// otherwise we're likely in an export scenario, or only generating one frame. either way don't request another frame just yet
	}
}

module.exports = draw;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// takes two arguments: canvas to be exported, and index count (for naming purposes)
function exportFrame(frame, i) {
	frame.toDataURL("image/jpeg", 1.0);

	// janky temporary fix -- create link and have script "click" it to download image of canvas at current state
	var thefilename = 'frame.jpg';
	var link = document.createElement('a');
	link.download = thefilename;
	// Construct the uri
	var uri = dataURL;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	// Cleanup the DOM
	document.body.removeChild(link);
	// delete link;
}

module.exports = exportFrame;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function stepper(drawFrame, howManyFrames) {

	// iterates as many times as there are frames
	for (i = 0; i < howManyFrames; i++) {

		// drawFrame should return current canvas object
		var _frame = drawFrame();
		exportFrame(_frame, i);
	}

	// finish function will shut down server, kick off processor, etc.
	finish();
}

// module.exports = stepper(howManyFrames);

module.exports = stepper;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// Pretty much yoinked this from radarboy3000 -- https://hackernoon.com/creative-coding-basics-4d623af1c647


// call this, it cretes a canvas and returns it's context
function createCanvas(canvasName) {
	var body = document.querySelector('body');
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', canvasName);
	body.appendChild(canvas);

	var ctx = canvas.getContext('2d');
	resize();

	window.addEventListener('resize', resize, false);

	return ctx;
}

function resize() {
	// TODO -- resizing window causes canvas to go blank
	console.log('resize function call');
	var c = document.getElementsByTagName('canvas');
	var width = window.innerWidth;
	var height = window.innerHeight;
	for (var i = 0; i < c.length; i++) {
		c[i].width = width;
		c[i].height = height;
	}
}

module.exports = createCanvas;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// animation library manifest

var canvas = __webpack_require__(4),
    utility = __webpack_require__(7);

var dwmanim = {
	canvas: canvas,
	utility: utility
};

module.exports = dwmanim;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/******
**** setup
******/

var draw = __webpack_require__(1),
    exportFrame = __webpack_require__(2),
    stepper = __webpack_require__(3),
    animation = __webpack_require__(0);

// When window loads, get errything started
console.log('index.js loaded');
window.addEventListener('load', boomBoom());

/******
**** play animation loop (browser)
******/

// uses window.requestAnimationFrame();
// super basic info: https://css-tricks.com/using-requestanimationframe/
// lengthy discussion: http://creativejs.com/resources/requestanimationframe/
// TODO: add rAF polyfill for super old browsers

// NOTE -- this strategy will require webpack or browserify or something similar so that I can utilize the above required files in a browser context

function playAnimation() {
	console.log('called playAnimation()');
	window.requestAnimationFrame(animation.draw);
}

/******
**** export animation loop (create a video)
******/

function exportAnimation() {
	console.log('called exportAnimation()');
	// indicate that this is not a continous animation (which would be iterated using window.requestAnimationFrame)
	animation.continuous = false;
	// pass the animation's draw function and the number of frames you want to export to the manual stepper
	// TODO: set desired number of frames variable somewhere (also framerate?)
	stepper(animation.draw, howManyFrames);
}

/******
**** execute function
******/

function boomBoom(toVid = false) {
	console.log('boom boom we got some room');
	if (toVid == true) {
		exportAnimation();
	} else {
		playAnimation();
	}
}

// TODO: do I need to export anything?
// module.exports = boomBoom;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var u = {};

// Generate a random number: float and integer
u.randFloat = function randFloat(low = 0, high = 1) {
	// note -- no params = random num between 0 and 1 (useful for percentages)
	return Math.random() * (high - low) + low;
};

u.randInt = function randInt(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
};

module.exports = u;

/***/ })
/******/ ]);