
function createCanvas(){
	canvas = document.getElementById('canvas1');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var ctx = canvas.getContext('2d');

	ctx.beginPath();
  ctx.arc(100, 100, 57, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#003300';
  ctx.stroke();

}


module.exports = createCanvas;