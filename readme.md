# dwm_anim

Basic framework for working with HTML5 Canvas / javascript animations. See section "Library Build" for more info. 

**Very rough implementation**, still sketching out ideas, but it is working at this point (yay!). Though I have not tested on anything but my own standard setup. 

## Usage

To start: 

	webpack --config webpack.config.js

And in separate window: 

	node server.js

Now you have a server running on port 6969

Load the page with a browser and the animation kicks off. 


### "Live" / "Sketch" mode

View canvas in standard browser as a webpage, for working on your animations. 

Start server as normal, open standard browser, make sure var toVid is set to false when animation kicks off. Edit in browser to your heart's content.

### "Export" mode

Open page, step through preset number of frames, saving each one, with the goal of concatenating those into a video file.

Start server, make sure toVid = true when you hit page (likely w/headless browser in the future). This creates all your frames in "output" directory

Then run ffmpeg or similar. Working ffmpeg command (run from within output directory): 

	ffmpeg -framerate 60 -y -i frame%04d.png -c:v libx264 -pix_fmt yuv420p -preset:v slow -profile:v baseline -crf 23 film.m4v

To crop a movie using ffmpeg, see [this S.O. thread](https://video.stackexchange.com/questions/4563/how-can-i-crop-a-video-with-ffmpeg)

To combine video and audio see [this S.O. thread](https://superuser.com/questions/277642/how-to-merge-audio-and-video-file-in-ffmpeg) Also try this: 

	ffmpeg -i "videoFile.mp4" -i "audioFile.mp3" -shortest outPutFile.mp4



<!-- ffmpeg -framerate 30 -y -i frame%04d.png -c:v libx264 -pix_fmt yuv420p -preset:v slow -profile:v baseline -crf 23 film.m4v -->

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
			