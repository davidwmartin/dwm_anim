/******
**** Fun With Particles
******/

// still in conceptual phase
var partObj = {};

// constructor for individual particles
var particle = {

	// coordinate of particle (initial value is start)
	x: lib.utility.randInt(0,lib.canvas.w),
	y: lib.utility.randInt(0,lib.canvas.h),
	
	// rate at which coordinates should change
	speed_x: lib.utility.posNeg() * lib.utility.randFloat(0,1),
	speed_y: lib.utility.posNeg() * lib.utility.randFloat(0,1),
	
	// used in some position transformations 
	angle: 1,
}

// array to hold the particles
var particles = [];

function particleField(number_of_particles){
	for (var i = 0; i < number_of_particles; i++){
		addParticle(i, particles, number_of_particles);
	}
}

function addParticle(_i, _particles, _number_of_particles){
	
	// create a new particle from above object
	_particle = new Particle;

	_particles.push(_particle);
}

// TODO -- "random" vs "periodic" particles (or separate "motion" object / function)