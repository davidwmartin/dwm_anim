var u = module.exports = {};

// TODO -- consider assigning all these methods to canvasRenderingContext2d.prototype to make using them less verbose and remove the need to pass a context to certain functions (or maybe do that at lib level ?)

/***
** Math Functions
***/

// random float
u.randFloat = function randFloat(low = 0,high = 1){
	// note -- no params = random num between 0 and 1 (useful for percentages)
	return Math.random() * (high - low) + low;
}

// random integer
u.randInt = function randInt(low, high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}

// (1 or -1)
u.posNeg = function posNeg(){
 return u.randInt(0,1) * 2 - 1;
}

function clamp(value, min, max){
  return Math.min(Math.max(value, Math.min(min, max)),Math.max(min, max));
}

/***
** Color Functions
***/

u.rgb = function(r,g,b){
	if (g == undefined) g = r;
	if (b == undefined) b = r;
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}
u.rgba = function(r, g, b, a) {
  if (g == undefined) {
   return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+')';
 } else if (b == undefined) {
    return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(g,0,1)+')';
  } else if (a == undefined){
  return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', 1)';
} else {
return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', '+clamp(a,0,1)+')';
 }
};

// TODO -- move to canvas module?
u.background = function(ctx, r, g, b, a){
  ctx.save();
  ctx.beginPath();
  if (g == undefined) {
  ctx.fillStyle = u.rgb(r, r, r);
  } else if (b == undefined && a == undefined) {
  ctx.fillStyle = u.rgba(r, r, r, g);
  } else if (a == undefined) {
  ctx.fillStyle = u.rgb(r, g, b);
  } else {
  ctx.fillStyle = u.rgba(r, g, b, a);
  }
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.closePath();
  ctx.restore();
};

// get distance between two sets of x,y  coordinates
// TODO -- objDist that assumes two objects, each w/x and y property?
// TODO -- move this to connections? shapes?
u.dist = function(x1, y1, x2, y2) {
 x2-=x1; y2-=y1;
 return Math.sqrt((x2*x2) + (y2*y2));
}


// map one set of numbers to another
u.map = function(num, inMin, inMax, outMin, outMax){

   return ( num - inMin ) * ( outMax - outMin ) / ( inMax - inMin ) + outMin;

}

