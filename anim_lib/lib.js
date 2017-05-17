// animation library manifest

// TODO -- global namespace this bad boy so it's descendents can be called directly? Or do I have to do that at the module-level for each module?
var dwmanim = {};

dwmanim.canvas = require('./canvas'); 
dwmanim.utility = require('./utility');
dwmanim.shapes = require('./shapes');
dwmanim.grid = require('./grid');
dwmanim.motion = require('./motion');

module.exports = dwmanim;