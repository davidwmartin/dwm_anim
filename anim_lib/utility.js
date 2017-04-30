var u = module.exports = {};

/***
** Random Number Generators
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
 return randInt(0,1) * 2 - 1;
}

/***
** Color Functions
***/

// u.rgb = function rgb(r,g,b){
// 	if (g == undefined) g = r;
// 	if (b == undefined) b = r;
// 	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
// }

/***
** Movement Functions
***/

u.bounce = function bounce(num, min, max, sz) {
  if (sz === undefined) {
    sz = 0;
  }
  if (num >= max - sz/2 || num - sz/2 <= min ) {
    return 1;
  } else {
    return 0;
  }
}