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

// TODO -- different fill and stroke for different shapes

// TODO -- some sort of z-indexing / stacking ability? or just handle that via draw order?

function Shape(ctx,_x,_y){
	this.center_x = _x;
	this.center_y = _y;
	this.ellipse = function(_width, _height){

		if (_height == undefined){ 
			height = _width 
		}	else { height = _height }

		ctx.beginPath();
		// for(var i=0; i<Math.PI*2; i+=Math.PI/16) {
		// ctx.lineTo(this.center_x+(Math.cos(i)*_width/2), this.center_y+(Math.sin(i)*height/2));
		// }
		ctx.ellipse(this.center_x, this.center_y, _width, height, 0, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};
	this.rect = function(_width, _height){

		if (_height == undefined){ 
			height = _width 
		}	else { height = _height }

		ctx.beginPath();
		ctx.fillRect(this.center_x, this.center_y, _width, height);
		ctx.closePath();

	}
}

// TODO -- still super annoying to have to pass ctx in
s.makeShape = function(ctx, _x, _y, _type, _width, _height){

	var shape = new Shape(ctx, _x, _y);
	// TODO -- better way of doing this w/predefined objects from below
	if (_type == "ellipse"){
		shape.ellipse(_width, _height);
	}
	else if (_type == "rectangle"){
		shape.rect(_width, _height);
	}

}

// below should "extend" shape object somehow
// var circle = {
// 	radius: 50
// 	// ...
// }
// var ellipse = {
// 	width: 100,
// 	height: 50
// }
// var regPolygon = {
// 	radius: 50,
// 	sides: 5
// }
// var quad = {
// 	width: 50,
// 	height: 80
// }



