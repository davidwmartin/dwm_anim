var u = {};

// Generate a random number: float and integer
u.randFloat = function randFloat(low = 0,high = 1){
	// note -- no params = random num between 0 and 1 (useful for percentages)
	return Math.random() * (high - low) + low;
}

u.randInt = function randInt(low, high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = u;