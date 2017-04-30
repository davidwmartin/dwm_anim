var lib = require('../anim_lib/lib.js');

var animation = module.exports = {
	name: 'test',
	setup: setupAnimation,
	draw: drawFrame,
	continuous: false,
	persist: {}
}


// initial setup stuff that shouldn't get looped every time
function setupAnimation(){
	var ctx = lib.canvas.create('canvas1');

	var number_of_balls = 1000;
	var balls = [];
	animation.persist.balls = balls;
	ctx.lineWidth = 1;
	var connect_radius = 50;
	var active_radius = 70;

	for (var i = 0; i < number_of_balls; i++) {
		addBall(i, balls, number_of_balls);
	}


}

// draw function for this animation -- this draws each frame
function drawFrame(){
	var canvas = document.getElementById('canvas1');
	var ctx = canvas.getContext('2d');

	moveBalls(animation.persist.balls);

	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	}
}

// functions used by above
function addBall(_i, _balls, _number_of_balls){
	var ball = {
		x: lib.utility.randInt(0,lib.canvas.w),
		y: lib.utility.randInt(0,lib.canvas.h),
		speed_x: lib.utility.posNeg * lib.utility.randFloat(0,3),
		speed_y: lib.utility.posNeg * lib.utility.randFloat(0,3),
		size: 2,
		color: 'rgb(255,255,255)',
		strokeColor: 'rgb(255,100,100)',
		angle: _i * 360/_number_of_balls,
		activeCount: 0
	}
	_balls.push(ball);
}

function moveBalls(_balls){
	for (var i=0; i<_balls.length; i++){
		var b = _balls[i];
		b.x += b.speed_x;
		b.y += b.speed_y;

		if (lib.utility.bounce(b.x, 0, lib.canvas.w)) b.speed_x *=-1;
		if (lib.utility.bounce(b.y, 0, lib.canvas.h)) b.speed_y *=-1;

		isActive(b);
	}
}