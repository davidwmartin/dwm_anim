/***
** Connect things together (i.e. shapes defined in shapes.js)
***/

var c = module.exports = {};


c.line = function (ctx, object1, object2){
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


c.spline = function(ctx, tPts, tension, thickness){

	var tension = tension || 0.5;
	
	var cPts = getcPts(tPts, tension);

	var numTPts = tPts.length;
	var numCPts = cPts.length;

	// draw curve between points
	ctx.beginPath();
	ctx.moveTo(tPts[0].x, tPts[0].y);

	// first is a quadratic (only 1 control point)
	ctx.quadraticCurveTo(cPts[0].x, cPts[0].y, tPts[1].x, tPts[1].y);

	// all middle ones are bezier curves (2 control points)
	for (var i = 1; i < numTPts - 2; i++) {
		ctx.bezierCurveTo(cPts[2*i-1].x, cPts[2*i-1].y, cPts[2*i].x, cPts[2*i].y, tPts[i+1].x, tPts[i+1].y);
	}
	// final is a quadratic
	ctx.quadraticCurveTo(cPts[numCPts-1].x,cPts[numCPts-1].y,tPts[numTPts-1].x, tPts[numTPts-1].y);


	ctx.lineWidth = thickness || 3;
	ctx.stroke();
	ctx.closePath();
}


// takes array of AT LEAST 3 point objects (shapes), returns array of control points -- used in spline calculations
function getcPts(pointsArray, t){

	var cPts = [];

	for (var i = 0; i < pointsArray.length - 2; i++) {
		var x0 = pointsArray[i].x,
			y0 = pointsArray[i].y,
			x1 = pointsArray[i+1].x,
			y1 = pointsArray[i+1].y,
			x2 = pointsArray[i+2].x,
			y2 = pointsArray[i+2].y;

		// adapted from tutorial -- http://scaledinnovation.com/analytics/splines/aboutSplines.html
		var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
		var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
		var fa=t*d01/(d01+d12);   // scaling factor for triangle Ta
		var fb=t*d12/(d01+d12);   // ditto for Tb, simplifies to fb=t-fa
		var p1x=x1-fa*(x2-x0);    // x2-x0 is the width of triangle T
		var p1y=y1-fa*(y2-y0);    // y2-y0 is the height of T
		var p2x=x1+fb*(x2-x0);
		var p2y=y1+fb*(y2-y0);  

		var cp1 = {
			x:p1x,
			y:p1y
		};
		var cp2 = {
			x:p2x,
			y:p2y
		};

		cPts.push(cp1, cp2);
	}

	return cPts;

}
