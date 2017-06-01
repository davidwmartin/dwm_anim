var mouse = {};


mouse.isDown = false;

document.body.onmousedown = function(){
	mouse.isDown = true;
};
document.body.onmouseup = function(){
	mouse.isDown = false;
};

module.exports = mouse;