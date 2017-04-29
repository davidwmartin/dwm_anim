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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var animation = {
	name: 'sample',
	draw: drawAnimation,
	continuous: true
};

function drawAnimation() {
	// draw function for this animation

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
/***/ (function(module, exports, __webpack_require__) {

/******
**** require modules
******/

var draw = __webpack_require__(1),
    exportFrame = __webpack_require__(2),
    stepper = __webpack_require__(3),
    animation = __webpack_require__(0);

/******
**** play animation loop (browser)
******/

// uses window.requestAnimationFrame();
// super basic info: https://css-tricks.com/using-requestanimationframe/
// lengthy discussion: http://creativejs.com/resources/requestanimationframe/
// TODO: add rAF polyfill for super old browsers

// NOTE -- this strategy will require webpack or browserify or something similar so that I can utilize the above required files in a browser context

function playAnimation() {
	animation.draw;
}

/******
**** export animation loop (create a video)
******/

function exportAnimation() {
	// indicate that this is not a continous animation (which would be iterated using window.requestAnimationFrame)
	animation.continuous = false;
	// pass the animation's draw function and the number of frames you want to export to the manual stepper
	// TODO: set desired number of frames variable somewhere (also framerate?)
	stepper(animation.draw, howManyFrames);
}

/******
**** execute function
******/

function boomBoom(toVid) {
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