/******
**** Fun With Particles
******/

// still in conceptual phase


// TODO -- intelligent defaults
var particle = {
	// coordinate of particle (initial value is start)
	x: 0,
	y: 0,
	
	// rate at which coordinates should change
	speed_x: 0,
	speed_y: 0,
	
	// used in some position transformations 
	angle: 1,
}


// TODO -- "random" vs "periodic" particles (or separate "motion" object / function)