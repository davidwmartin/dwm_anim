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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var lib = __webpack_require__(5);

var animation = module.exports = {
	name: 'test',
	setup: setupAnimation,
	draw: drawFrame,
	continuous: false,
	persist: {}
};

// initial setup stuff that shouldn't get looped every time
function setupAnimation() {
	var ctx = lib.canvas.create('canvas1');

	var number_of_balls = 1000;
	var balls = [];
	animation.persist.balls = balls;
	ctx.lineWidth = 1;
	var connect_radius = 50;
	var active_radius = 70;

	for (var i = 0; i < number_of_balls; i++) {
		addBall(i, balls, number_of_balls);
	}
}

// draw function for this animation -- this draws each frame
function drawFrame() {
	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	moveBalls(animation.persist.balls);

	if (animation.continuous == true) {
		window.requestAnimationFrame(animation.draw);
	}
}

// functions used by above
function addBall(_i, _balls, _number_of_balls) {
	var ball = {
		x: lib.utility.randInt(0, lib.canvas.w),
		y: lib.utility.randInt(0, lib.canvas.h),
		speed_x: lib.utility.posNeg * lib.utility.randFloat(0, 3),
		speed_y: lib.utility.posNeg * lib.utility.randFloat(0, 3),
		size: 2,
		color: 'rgb(255,255,255)',
		strokeColor: 'rgb(255,100,100)',
		angle: _i * 360 / _number_of_balls,
		activeCount: 0
	};
	_balls.push(ball);
}

function moveBalls(_balls) {
	for (var i = 0; i < _balls.length; i++) {
		var b = _balls[i];
		b.x += b.speed_x;
		b.y += b.speed_y;

		if (lib.utility.bounce(b.x, 0, lib.canvas.w)) b.speed_x *= -1;
		if (lib.utility.bounce(b.y, 0, lib.canvas.h)) b.speed_y *= -1;

		isActive(b);
	}
}

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

var canvas = module.exports = {};

// Pretty much yoinked this from radarboy3000 -- https://hackernoon.com/creative-coding-basics-4d623af1c647


// call this, it cretes a canvas and returns it's context
canvas.create = function create(canvasName) {
	var body = document.querySelector('body');
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', canvasName);
	body.appendChild(canvas);

	var ctx = canvas.getContext('2d');
	resize();

	window.addEventListener('resize', resize, false);

	return ctx;
};

function resize() {
	console.log('resize function call');
	var c = document.getElementsByTagName('canvas');
	var w = window.innerWidth;
	var h = window.innerHeight;
	for (var i = 0; i < c.length; i++) {
		// set actual width and height of each canvas
		c[i].width = w;
		c[i].height = h;
	}
	// update canvas object with width and height properties for use by animation functions
	canvas.w = w;
	canvas.h = h;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// animation library manifest

var dwmanim = {};

dwmanim.canvas = __webpack_require__(4);
dwmanim.utility = __webpack_require__(7);
dwmanim.shapes = __webpack_require__(6);

module.exports = dwmanim;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var s = {};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var u = module.exports = {};

/***
** Random Number Generators
***/

// random float
u.randFloat = function randFloat(low = 0, high = 1) {
  // note -- no params = random num between 0 and 1 (useful for percentages)
  return Math.random() * (high - low) + low;
};

// random integer
u.randInt = function randInt(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
};

// (1 or -1)
u.posNeg = function posNeg() {
  return randInt(0, 1) * 2 - 1;
};

/***
** Color Functions
***/

// u.rgb = function rgb(r,g,b){
// 	if (g == undefined) g = r;
// 	if (b == undefined) b = r;
// 	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
// }

/***
** Movement Functions
***/

u.bounce = function bounce(num, min, max, sz) {
  if (sz === undefined) {
    sz = 0;
  }
  if (num >= max - sz / 2 || num - sz / 2 <= min) {
    return 1;
  } else {
    return 0;
  }
};

/***/ }),
/* 8 */
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
window.addEventListener("load", boomBoom());

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
	window.requestAnimationFrame(animation.setup);
	// TODO -- this seems jank -- not sure why I have to call window.rAF on the setup function, but calling just animation.setup() causes the createCanvas function to fail when it can't find the body element 
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

/***/ })
/******/ ]);