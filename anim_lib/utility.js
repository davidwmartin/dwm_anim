var u = module.exports = {};

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

u.rgb = function rgb(r,g,b){
	if (g == undefined) g = r;
	if (b == undefined) b = r;
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}
u.rgba = function rgba(r, g, b, a) {
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

u.background = function background(context, r, g, b, a){
 if (g == undefined) {
 context.fillStyle = u.rgb(r, r, r);
 } else if (b == undefined && a == undefined) {
  context.fillStyle = u.rgba(r, r, r, g);
 } else if (a == undefined) {
  context.fillStyle = u.rgb(r, g, b);
 } else {
 context.fillStyle = u.rgba(r, g, b, a);
 }
 // TODO -- better solution for w and h here
 context.fillRect(0, 0, window.innerWidth, window.innerHeight);
};

/***
** Movement Functions
***/

u.bounce = function (num, min, max, sz) {
  if (sz === undefined) {
    sz = 0;
  }
  if (num >= max - sz/2 || num - sz/2 <= min ) {
    return 1;
  } else {
    return 0;
  }
}

// get distance between two sets of x,y  coordinates
u.dist = function dist(x1, y1, x2, y2) {
 x2-=x1; y2-=y1;
 return Math.sqrt((x2*x2) + (y2*y2));
}
