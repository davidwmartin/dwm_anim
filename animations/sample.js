var animation = {
	name: 'sample',
	draw: drawAnimation, 
	continuous: true
}


funtion drawAnimation(){
	// draw function for this animation

	if (animation.continuous == true){
		window.requestAnimationFrame(animation.draw);
	}
}


module.exports = animation;