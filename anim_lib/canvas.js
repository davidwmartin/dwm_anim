// Pretty much yoinked this from radarboy3000 -- https://hackernoon.com/creative-coding-basics-4d623af1c647


// call this, it cretes a canvas and returns it's context
function createCanvas(canvasName){
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
	// TODO -- resizing window causes canvas to go blank
	console.log('resize function call');
	var c = document.getElementsByTagName('canvas');
	var width = window.innerWidth;
	var height = window.innerHeight;
	for(var i = 0; i < c.length; i++) {
		c[i].width = width;
		c[i].height = height;
	}
}

module.exports = createCanvas;