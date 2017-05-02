
// takes two arguments: canvas to be exported, and index count (for naming purposes)
function exportFrame(frame, i){
	var postThis = {};
	// get dataURL from current canvas
	postThis.frame = frame.toDataURL("image/png");
	postThis.number = i;
	// var dataURL = frame.toDataURL("image/png");
	// var theFileName = 'frame' + i + '.png';

	var req = new XMLHttpRequest();
	req.open("POST", 'http://localhost:6969', true);
	req.setRequestHeader('Content-Type', 'application/json');
	// req.onload = function(oEvent) {
	// 	// console.log('weraldfjk');
	// };

	req.send(JSON.stringify(postThis));
	// console.log(inc);
	// console.log(req.readyState);


	// while(inc<1) {}

	// req.end();

	// // janky temporary fix -- create link and have script "click" it to download image of canvas at current state
	// var thefilename = 'frame.png'
	// var link = document.createElement('a');
	// link.download = thefilename;
	// // Construct the uri
	// var uri = dataURL;
	// link.href = uri;
	// document.body.appendChild(link);
	// link.click();
	// // Cleanup the DOM
	// document.body.removeChild(link);
	// // delete link;

	// // console.log('exported frame: '+ i);
	
}

module.exports = exportFrame;

