
// takes two arguments: canvas to be exported, and index count (for naming purposes)
function exportFrame(frame, i){
	var postThis = {};
	// get dataURL from current canvas
	postThis.frame = frame.toDataURL("image/png");
	// get iterator number
	postThis.number = i;

	// POST frame object to server for image processing (as JSON string)
	var req = new XMLHttpRequest();
	req.open("POST", 'http://localhost:6969', false);
	req.setRequestHeader('Content-Type', 'application/json');

	req.send(JSON.stringify(postThis));
	
}

module.exports = exportFrame;

