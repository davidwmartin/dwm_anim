var canvas = require('./canvas');// TODO -- a bit ugly that I have to require this here

/***
** Movement Functions -- designed to work with shape objects
***/

// TODO -- seems like linear and OSC movement setup & usage is inconsistent...

var motion = module.exports = {}

// Currently -- the below methods require that the object passed in have dx and dy properties
motion.addMotion = function(shape, dx, dy, angle, oscSpeed){
	shape.startx = shape.x;
	shape.starty = shape.y;
	shape.dx = dx;
	shape.dy = dy;

	// TODO -- split moveOsc props below into separate addMotionOsc function? 
	shape.angle = angle;
	if(oscSpeed !== undefined) shape.oscSpeed = oscSpeed; // optional oscSpeed prop -- if you intend to move via oscillator
}


// basic, linear moption
motion.moveLinear = function(object){
	object.x += object.dx;
	object.y += object.dy;
}

// "bounce" -- linear + reverses direction if an object hits the edge of the canvas
motion.moveBounce = function (object) {
	motion.moveLinear(object);
	var rad = object.w/2;

	if (object.x - rad <= 0 || object.x + rad >= canvas.w){
		object.dx *= -1;
	}

	if (object.y - rad <= 0 || object.y + rad >= canvas.h){
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




