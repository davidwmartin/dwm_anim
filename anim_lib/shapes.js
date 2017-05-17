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
	if (height == undefined) this.h = width;
	else this.h = height;
}

shapes.Polygon = function(startX, startY, width, height, sides){
	var thisPoly = new shapes.Shape(startX, startY, width, height);
	thisPoly.type = "polygon";
	thisPoly.sides = sides;
	thisPoly.draw = function(ctx, poly){
		if (ctx !== undefined){
			if (sides < 3) return;
	    ctx.beginPath();

	    // from @radarboy3000 medium tutorial: 
			ctx.moveTo (poly.x +  poly.w/2 * Math.cos(0), poly.y +  poly.w/2 *  Math.sin(0));
			for (var i = 1; i <= poly.sides; i += 1) {
			  ctx.lineTo (poly.x + poly.w/2 * Math.cos(i * 2 * Math.PI / poly.sides), poly.y + poly.w/2 * Math.sin(i * 2 * Math.PI / poly.sides));
			}
	    ctx.closePath();
	    ctx.fill();
	    ctx.stroke();
	  }
	};

	return thisPoly;
}

shapes.Circle = function(startX, startY, width){
	var thisCircle = new shapes.Shape(startX, startY, width);
	thisCircle.type = "circle";

	thisCircle.draw = function(ctx, circ){
		if (ctx !== undefined){
		ctx.beginPath();
		ctx.ellipse(circ.x, circ.y, circ.w, circ.h, 0, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		}
	};

	return thisCircle;
}
