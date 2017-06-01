var canvas = module.exports = {};

// Pretty much yoinked this from radarboy3000 -- https://hackernoon.com/creative-coding-basics-4d623af1c647


// call this, it cretes a canvas and returns it's context
canvas.create = function create(canvasName){
	var body = document.querySelector('body');
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', canvasName);
	body.appendChild(canvas);

	var ctx = canvas.getContext('2d');
	resize();
	
	window.addEventListener('resize', resize, false);

	return ctx;
}

function resize(){
	console.log('resize function call');
	var c = document.getElementsByTagName('canvas');
	// var w = window.innerWidth;
	// var h = window.innerHeight;
	var w = 600;
	var h = 800;
	for(var i = 0; i < c.length; i++) {
		// set actual width and height of each canvas
		c[i].width = w;
		c[i].height = h;
	}
	// update canvas object with width and height properties for use by animation functions
	canvas.w = w;
	canvas.h = h;
}