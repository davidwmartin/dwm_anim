var canvas = require('./canvas');// TODO -- a bit ugly that I have to require this here

/***
** Movement Functions -- designed to work with shape objects
***/

// TODO -- seems like linear and OSC movement setup & usage is inconsistent...

var motion = module.exports = {}

// Currently -- the below methods require that the object passed in have dx and dy properties
// TODO -- this is awkward -- split out new props that this adds into the respective move__ functions OOOORRR -- see below and have separate add function for periodic / oscillating motion
motion.addMotion = function(object, dx, dy, angle, oscSpeed){
	object.startx = object.x;
	object.starty = object.y;
	// TODO -- dx, dy not used in moveOsc, so the dual addMotion, move__ paradigm is a bit busted
	object.dx = dx;
	object.dy = dy;

	// TODO -- split moveOsc props below into separate addMotionOsc function?
	if(angle !== undefined) object.angle = angle;
	if(oscSpeed !== undefined) object.oscSpeed = oscSpeed; // optional oscSpeed prop -- if you intend to move via oscillator
}


// basic, linear moption
motion.moveLinear = function(object){
	object.x += object.dx;
	object.y += object.dy;
}

// "bounce" -- linear + reverses direction if an object hits the edge of the canvas
// TODO -- this doesn't seem to be working accurately -- object overlaps edges of canvas before bouncing
// TODO -- accept generic bounce min / max instead of canvas object
motion.moveBounce = function (object,canvas) {
	var canvas = canvas;
	motion.moveLinear(object);
	var rad = object.w/2;

	if (object.x - rad <= 0 || object.x + rad >= canvas.width){
		object.dx *= -1;
	}

	if (object.y - rad <= 0 || object.y + rad >= canvas.height){
		object.dy *= -1;
	}
}

// takes an object, angle, oscillation speed (higher = slower), movement in x direction, movement in y direction, and "true" or "false" for yCos (to give circular instead of linear oscillation)
motion.moveOsc = function(object, xMovement, yMovement, yCos){
	// TODO -- still not 100% sure what angle is doing here. 
	object.angle += 1/object.oscSpeed;
	object.x = object.startx + Math.sin(object.angle)* xMovement;
	if (yCos == true){
		object.y = object.starty + Math.cos(object.angle)* yMovement;
	}
	else {
		object.y = object.starty + Math.sin(object.angle)* yMovement;
	}

}




