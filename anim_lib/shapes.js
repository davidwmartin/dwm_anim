var s = module.exports = {};

s.line = function (context, x1, y1, x2, y2){
 context.beginPath();
 context.moveTo(x1,y1);
 context.lineTo(x2,y2);
 context.stroke();
 context.beginPath();
};