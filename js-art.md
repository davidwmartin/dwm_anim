# Javascript Art / Animating

## Started Here: 

Starting off tutorial here: https://hackernoon.com/creative-coding-basics-4d623af1c647

## Further Research
-[time based animation](https://www.viget.com/articles/time-based-animation)

## Inspiration -- Animations / Tutorials
- http://codepen.io/rthavi/pen/LWyegK
- https://bocoup.com/blog/smoothly-animate-thousands-of-points-with-html5-canvas-and-d3

## Project Ideas
* connected-particles lightning storm
	- use particle-connections.js script, but instead of always present connections trigger them on a mouse click, or at random times and coordinates, and watch the connections spread out like a web of electricity. 
* photo work
	- manipulate shapes over image BG, style via css image filters, do trippy ish. 
		- tunnel.psd (caitlin's neighborhood) -- animate triangles, changing sizes
		- trees-have-eyes.psd (mesa peak) -- squares generating out in swarms like leaves
* abstract laser-soundwaves -- oscillate y value on amplitude of sound source or something, x by time




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


## Framework Goals (mostly achieved)

General goal is a minimal html canvas animation library to support two (maybe three) use cases:

1. "dev" / easy in-browser work, with simple server, file watching, etc. For creating animations and exploring possibilities. 
2. "export" / create video -- hit server with headless browser, capture contents of canvas on each frame iteration, export to ffmpeg or similar for turning into a video.
3. (future) -- "publish" -- easily export self-contained animations for use on websites

I want to roll-it-myself as much as possible, for greater control over the process, greater extensibility and modularity as I develop this out, and as a learning experience.