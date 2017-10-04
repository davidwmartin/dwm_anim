var canvas = module.exports = {};

// basic creation function inspired by radarboy3000 -- https://hackernoon.com/creative-coding-basics-4d623af1c647

/////creates a canvas and returns it's context
// examples: 
//1: create()
//2: create('name')
//3: create('name', false)
//4: create('name', 400, 600)
//5: create('name', false, 400, 600)
canvas.create = function create(a,b,c,d){

	var canvasName, onScreen, canvas = document.createElement('canvas');

	canvasName = a || "canvas";
	canvas.setAttribute('id', canvasName);
	onScreen = true;

	if (typeof b == 'boolean'){
		// if b arg is boolean, it's the onScreen arg
		onScreen = b;
		if (c) {
			// if c arg, it's width
			canvas.width = c;
			if (d){
				// if d arg, it's width
				canvas.height = d;
				
			} else{
				canvas.height = c;
			}
		} else{
			// no explicit size, treat as responsive
			resize(canvas);
			window.addEventListener('resize', resize(canvas), false);
		}

	} else if (b){
		// if b is not boolean but exists, it's width
		canvas.width = b;
		if (c){
			// if c, it's height
			canvas.height = c;
		} else{
			// if not, it's a square
			canvas.height = b;
		}
	} else {
		// no explicit size, treat as responsive
		resize(canvas);
		window.addEventListener('resize', resize(canvas), false);
	}

	if (onScreen){
		// if onScreen, add to body (else this is still available as a function on lib.canvas object -- see below)
		this.addToBody(canvas);
	}

	// get and return context
	var ctx = canvas.getContext('2d');
	return ctx;
}


// appends a canvas to the page body -- happens automatically unless you pass in "false" for "onScreen" argument in canvas creation function above
canvas.addToBody = function(canvas){
	var body = document.querySelector('body');
	body.appendChild(canvas);
}

// takes an array of contexts, returns a single flattened canvas (for export)
canvas.flatten = function(contexts){
	// the first context in the array is the base
	var base = contexts[0];
	for (var i = 0; i < contexts.length - 1; i++) {
		base.drawImage(contexts[i+1].canvas,0,0);
	}
	return base.canvas;
}

//// for compositing canvases
// takes a base context, and an array of arrays where first element is context to be composited, and second is string of globalCompositeOperation value
// e.g. composite(ctxBase, [[ctx1, 'source-over'], [ctx2, 'linear-burn']])
canvas.composite = function(baseCtx, ctxToComposite){
	var baseCtx = baseCtx;
	for (var i = 0; i < ctxToComposite.length; i++) {
		var comp = ctxToComposite[i];
		baseCtx.globalCompositeOperation = comp[1];
		// console.log(baseCtx);
		baseCtx.drawImage(comp[0].canvas, 0, 0);
	}
}

canvas.clear = function(ctx){
	if (Array.isArray(ctx)) {
		for (var i = 0; i < ctx.length; i++) {
			clearCtx(ctx[i]);
		}
	}
	else {
		clearCtx(ctx);
	}

	function clearCtx(ctx){
		ctx.beginPath();
		ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
		ctx.closePath();
	}
}

function resize(canvas){
	console.log('resize function call');

	var w = window.innerWidth;
	var h = window.innerHeight;

	canvas.width = w;
	canvas.height = h;

}