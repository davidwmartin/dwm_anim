// takes two arguments: canvas to be exported, and index count (for naming purposes)
function exportFrame(frame, i){
	frame.toDataURL("image/jpeg", 1.0);

	// janky temporary fix -- create link and have script "click" it to download image of canvas at current state
	var thefilename = 'frame.jpg'
	var link = document.createElement('a');
	link.download = thefilename;
	// Construct the uri
	var uri = dataURL;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	// Cleanup the DOM
	document.body.removeChild(link);
	// delete link;
}

module.exports = exportFrame;