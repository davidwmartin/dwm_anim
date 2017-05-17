
var s = module.exports = {};

// TODO -- consider assigning all these methods to canvasRenderingContext2d.prototype to make using them less verbose and remove the need to pass a context

s.line = function (context, x1, y1, x2, y2){
 context.beginPath();
 context.moveTo(x1,y1);
 context.lineTo(x2,y2);
 context.stroke();
 context.closePath();
};


// Shape constructor -- takes context (ugh -- TODO: fix this), and start position, creates object with position and properties which are functions that draw different types of shape, based on what type is passed into makeShape function below.

// TODO -- still super annoying to have to pass ctx in

// TODO -- different fill and stroke for different shapes

// TODO -- some sort of z-indexing / stacking ability? or just handle that via draw order?

s.Shape = function(ctx, _x, _y, _stroke, _fill, _width, _height){
	
	if (_height == undefined) _height = _width;

	this.start_x = _x;
	this.start_y = _y;
	this.x = _x;
	this.y = _y;
	this.w = _width;
	this.h = _height;
	this.speed_x = 1;
	this.speed_y = 1;
	this.angle = 0; // is this needed?
	this.stroke = _stroke;
	this.fill = _fill;
	this.ellipse = function(){
		
		ctx.fillStyle = this.stroke;
		ctx.strokeStyle = this.fill;

		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
	this.rect = function(){

		ctx.fillStyle = this.stroke;
		ctx.strokeStyle = this.fill;

		ctx.beginPath();
		// TODO -- fill and stroke
		ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
		ctx.closePath();

	}
	this.poly = function(_sides, _size){
		ctx.fillStyle = this.stroke;
		ctx.strokeStyle = this.fill;

		ctx.beginPath();
		ctx.polygon(this.x, this.y, _sides, _size)
		ctx.closePath();
	}
}

// TODO -- may not need this bit after all
s.makeShape = function(ctx, _x, _y, _type, _width, _height){

	var shape = new Shape(ctx, _x, _y);
	// TODO -- better way of doing this w/predefined objects from below
	if (_type == "ellipse"){
		shape.ellipse(_width, _height);
	}
	else if (_type == "rectangle"){
		shape.rect(_width, _height);
	}
	else if (_type == "polygon"){
		// not working yet. take a look at this tutorial: 
		// http://www.arungudelli.com/html5/html5-canvas-polygon/
		shape.poly(_sides, _size);
	}
}


// TODO -- break out functionality more -- so object for "shape" for "movement" for each type of shape, etc
// see -- shapes-sketch.js

