var s = module.exports = {};

// TODO -- consider assigning all these methods to canvasRenderingContext2d.prototype to make using them less verbose and remove the need to pass a context

s.line = function (context, x1, y1, x2, y2){
 context.beginPath();
 context.moveTo(x1,y1);
 context.lineTo(x2,y2);
 context.stroke();
 context.beginPath();
};