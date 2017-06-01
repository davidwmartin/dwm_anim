var image = module.exports = {};


function centerImage(canvas, ctx, img){

	 ctx.drawImage(img, canW / 2 - imgW / 2,  canH / 2 - imgH / 2);

}


// longer syntax: 
// ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dwidth, dheight);




function glitchLines(canvas, ctx, img, numSlices){
	console.log('drawing');
	var imgW = img.width;
	var imgH = img.height;
	var canW = lib.canvas.w;
	var canH = lib.canvas.h;  

	// console.log(img);

	if (numSlices == undefined) var numSlices = 15;
	var sliceHeight = canH / numSlices;
	if (sliceMaxOffset == undefined) var sliceMaxOffset = 20;

	for (var i = 0; i < numSlices; i++) {
		var randOffset = lib.utility.randInt(-sliceMaxOffset,sliceMaxOffset);

		// syntax: 
		// ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dwidth, dheight);
		ctx.drawImage(img, imgW/2-canW/2, imgH/2 - canH/2 + (i * sliceHeight), canW, sliceHeight, randOffset, i * sliceHeight, canW + randOffset, sliceHeight);

	}

}
