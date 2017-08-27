/***
** Lets Make Shapes! Weeee
***/

var shapes = module.exports = {};

// basic strategy is this: 
// start w/generic Shape (only position and size) -- other constructors instantiate a shape and add their own distinct classes (e.g. # of sides for a polygon)
// each specific constructor also defines a draw function to be called in an animation loop

// TODO -- consider "radius" instead of w, h
shapes.Shape = function(startX, startY, width, height){
	this.x = startX;
	this.y = startY;
	this.w = width;
	this.color = function(fill, stroke){
		this.fill = fill;
		if(stroke == undefined){
			this.stroke = fill;
		} else{
			this.stroke = stroke;
		}
	};
	if (height == undefined) this.h = width;
	else this.h = height;
}

shapes.Polygon = function(startX, startY, width, height, sides, angle){
	var thisPoly = new shapes.Shape(startX, startY, width, height);
	thisPoly.type = "polygon";
	thisPoly.sides = sides;

	// TODO -- implemented this for a specific animation, does it make sense to add here?
	var angle = thisPoly.angle = angle || 0;

	thisPoly.draw = function(ctx){
		if (ctx !== undefined){
			if (sides < 3) return;
	    ctx.beginPath();

	    // from @radarboy3000 medium tutorial:
	    // evenly distributes vertices around the Unit Circle, moving BACKWARDS
			ctx.moveTo (this.x + this.w/2 * Math.cos(angle), this.y + this.h/2 * Math.sin(angle));
			for (var i = 1; i <= this.sides; i += 1) {
			  ctx.lineTo (this.x + this.w/2 * Math.cos(i * 2 * Math.PI / this.sides + angle), this.y + this.h/2 * Math.sin(i * 2 * Math.PI / this.sides + angle));
			}

	    ctx.fill();
	    ctx.stroke();

	    ctx.closePath();
	  }
	};

	return thisPoly;
}

// TODO -- generalize to "ellipse"?
shapes.Circle = function(startX, startY, width){
	var thisCircle = new shapes.Shape(startX, startY, width);
	thisCircle.type = "circle";

	thisCircle.draw = function(ctx){
		if (ctx !== undefined){
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.w, this.w, 0, 0, Math.PI*2, true);

	  ctx.fill();
		// ctx.stroke();

		ctx.closePath();
		}
	};

	return thisCircle;
}



// draws a line between two shapes
shapes.connect = function (ctx, object1, object2){
	var x1 = object1.x;
	var y1 = object1.y;
	var x2 = object2.x;
	var y2 = object2.y;

	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
	ctx.closePath();

}; 
