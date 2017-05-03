# dwm_anim

Basic framework for working with HTML5 Canvas / javascript animations. See section "Library Build" for more info. 

Rough implementation, still sketching out ideas, but it is working at this point (yay!). Though I have not tested on anything but my own standard setup. 

This is a more technical document. For the creative side see js-art.md

## Usage

To start: 

	webpack --config webpack.config.js

And in separate window: 

	node server.js

Now you have a server running on port 6969

Load the page with a browser and the animation kicks off. 


### "Live" / "Sketch" mode

Start server as normal, open standard browser, make sure var toVid is set to false when animation kicks off. Edit in browser to your heart's content.

### "Export" mode

Start server, make sure toVid = true when you hit page (likely w/headless browser in the future). This creates all your frames in "output" directory

Then run ffmpeg or similar. Working ffmpeg command (run from within output directory): 

	ffmpeg -y -i frame%04d.png -c:v libx264 -pix_fmt yuv420p -preset:v slow -profile:v baseline -crf 23 film.m4v

<!-- TODO:  audit / customize above command. couldn't get it to work for the longest time, I think the kicker was the '-pix_fmt yuv420p' option but I have NOT yet tested that-->

## Overview

Few parts:

1. Simple node http server (server.js) which does two things:	
	- serve frontend files from "serve" directory
	- accept POST requests from frontend during "export" mode, which are objects made up
2. Animation-playing framework, defined by index.js
	- gets bundled, runs client-side
	- is in charge of playing our animation
	- require('..')s a few things:
		- stepper module that iterates when we're not just doing a window.requestAnimationFrame loop
		- animation object, from an animation in "animations" directory -- see "animations/sample.js" for what this looks like
			- (via animation object) animations helper-functions (manifest located at anim_lib/lib.js)


## Record to video

#### Overviews
- http://wesbos.com/html5-canvas-websockets-nodejs/
- https://blog.animatron.com/2014/01/22/how-we-render-animated-content-from-html5-canvas/
- https://web.archive.org/web/20120126022742/http://www.ultramegatech.com:80/blog/2010/09/record-html-canvas-animations-to-video/
- GIF
	- http://techslides.com/make-animated-gifs-from-videos-with-html5

#### Related
- [node ffmpeg](https://www.npmjs.com/package/ffmpeg)
- [node phantom](https://github.com/alexscheelmeyer/node-phantom)
	- https://github.com/alexscheelmeyer/node-phantom/blob/master/test/pageevaluate.js


## Library build

### Application Framework

General goal is a minimal html canvas animation library to support two (maybe three) use cases:

1. "dev" / easy in-browser work, with simple server, file watching, etc. For creating animations and exploring possibilities. 
2. "export" / create video -- hit server with headless browser, capture contents of canvas on each frame iteration, export to ffmpeg or similar for turning into a video.
3. (future) -- "publish" -- easily export self-contained animations for use on websites

I want to roll-it-myself as much as possible, for greater control over the process, greater extensibility and modularity as I develop this out, and as a learning experience.

### Animation library / helper functions

TODO: 

* utility
	- canvas creation function
	- info about size of window (w,h, changes on page resize)
	- animate loop function
		- variable frame rate?
		- options for "trails" / level of opacity of frame BG
	- calculate distance between two objects
		- can this handle "collision detection" as well?
	- oscillators
* shapes (objects to describe, and a function to build them)
	- polygons (indefinite sides)
		- square, rectangle
		- triangle
	- circle / ellipse
	- solid & stroke versions of each
* movement functions
	- linear
		- more complex movements like "bounce", "continuous rain", etc 
	- oscillating (have some predefined movement paths?)
* particle helper? easily generate an indefinite number of the above
