var canvas = require('./canvas');// TODO -- a bit ugly that I have to require this here

/***
** Movement Functions -- designed to work with shape objects
***/

var motion = module.exports = {}

// Currently -- the below methods require that the object passed in have dx and dy properties
motion.addMotion = function(shape, dx, dy){
	shape.dx = dx;
	shape.dy = dy;
}


// basic, linear moption
motion.moveLinear = function(object){
	object.x += object.dx;
	object.y += object.dy;
}

motion.bounce = function (object) {

	motion.moveLinear(object);
	
	var rad = object.w/2;

	console.log("y: " + object.y );
	console.log("h: "+ canvas.h);

	if (object.x - rad <= 0 || object.x + rad >= canvas.w){
		object.dx *= -1;
	}

	if (object.y - rad <= 0 || object.y + rad >= canvas.h){
		object.dy *= -1;
	}

	// var sz = object.w/2;
  // if (num >= max - sz/2 || num - sz/2 <= min ) {
  //   return 1;
  // } else {
  //   return 0;
  // }
}
