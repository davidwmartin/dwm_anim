// animation library manifest

// TODO -- global namespace this bad boy so it's descendents can be called directly? Or do I have to do that at the module-level for each module?
var dwmanim = {};

dwmanim.canvas = require('./canvas'); 
dwmanim.utility = require('./utility');
dwmanim.shapes = require('./shapes');
dwmanim.connect = require('./connections');
dwmanim.grid = require('./grid'); // TODO -- is this in use?
dwmanim.motion = require('./motion');
dwmanim.glitcher = require('./glitcher');
dwmanim.mic = require('./mic');
// dwmanim.mouse = require('./mouse');
// dwmanim.image = require('./images');

module.exports = dwmanim;