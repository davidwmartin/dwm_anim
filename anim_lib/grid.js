// simple grid
// ORRRR is this just more of an easy "responsive" positioner and the particle grid is more a subset of particles.js?


var grid = module.exports = {}


// idk what's going on here. 

grid.position = function ProportionalGrid(_horiz_prop, _vert_prop, _grid_w, _grid_h, _start_x, _start_y){

	// default to center of grid
	var horiz_prop = _horiz_prop || 0.5;
	var vert_prop = _vert_prop || 0.5;

	this.start = {x: _start_x || 0, y:_start_y || 0};

	this.grid_w = _grid_w || '100%';
	this.grid_h = _grid_h || '100%';

	return this;
}



// function Grid(_number_horiz, _number_vert){
// };