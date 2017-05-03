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

## TODO: 

### Framework / Technical

- allow user to set frame size of canvas when in export mode
- global config object?

### Animation Helper Functions

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
