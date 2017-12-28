// webaudio stuff for soundreactive vizzzz


var mic = module.exports = {};


// tutorial by @radarboy3000 -- https://hackernoon.com/creative-coding-using-the-microphone-to-make-sound-reactive-art-part1-164fd3d972f3
// code -- https://github.com/GeorgeGally/creative_coding/blob/master/js/mic.js

mic.Mic = function(fft){

	// variable declarations
	var fftSize = fft || 1024;

	this.spectrum = [];
	this.volume = this.vol || 0;
	this.peakVolume = 0;

	// TODO -- this is questionable
	var self = this;

	var audioCtx = new AudioContext();
	var sampleRate = audioCtx.sampleRate;

	// fallback for webkit
	window.AudioContext = window.AudioContext ||  window.webkitAudioContext;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;


	// wait for window to load before getting new AudioContext
	window.addEventListener('load', init(), false);

	function init(){
		try{
			startMic(new AudioContext());
		}
		catch(e){
			console.error(e);
			console.log('Web Audio API not supported in this browser');
		}
	}

	// 
	function startMic(context){

		// get access to mic
		navigator.mediaDevices.getUserMedia({audio: true})
			.then(processSound)
			.catch(function(e){
				console.error(e);
			});


		function processSound(_stream){
			
			// use analyser to extract frequency, timing etc
			var analyser = context.createAnalyser();
			// console.log(analyser);
			analyser.smoothingTimeConstant = 0.2;
			analyser.fftSize = fftSize;

			// creates a ScriptProcessorNode allows generation, processing, analyzing of audio data
			var node = context.createScriptProcessor(fftSize*2, 1, 1);


			// TODO -- bad!
			self.getRMS = function(_spectrum) {
				var rms = 0;
				for (var i = 0; i < _spectrum.length; i++) {
					rms += _spectrum[i] * _spectrum[i];
				}
				rms /= _spectrum.length;
				rms = Math.sqrt(rms);
				return rms;
			}


			node.onaudioprocess = function(){

				// attach some stuff to window (not sure this is actually happening, tutorial is jacked up)
				// TODO -- probably a better way to handle this, like attaching as properties of the Microphone object

				// returns array which is half the fftSize
				self.spectrum = new Uint8Array(analyser.frequencyBitCount);

				// !!!!!!!!!!!!!!!!!!!!!
				// !!!!!!!!!!!!!!!!!!!!!
				// !!!!!!!!!!!!!!!!!!!!!
				// getByteFrequencyData returns amplitude for each bin
				analyser.getByteFrequencyData(self.spectrum);
				// getByteTimeDomainData gets volumes over the sample time
				// analyser.getByteTimeDomainData(self.spectrum);

				console.log(analyser.getByteFrequencyData(self.spectrum)); // NOT WORKING CURRENTLY (RETURNS UNDEFINED)
				// !!!!!!!!!!!!!!!!!!!!!
				// !!!!!!!!!!!!!!!!!!!!!	
				// !!!!!!!!!!!!!!!!!!!!!

				self.vol = self.getRMS(self.spectrum);

				// get peak - a hack when our volumes are low
				if (self.vol > self.peak_volume) self.peak_volume = self.vol;

			};

			var input = context.createMediaStreamSource(_stream);
			input.connect(analyser);
			analyser.connect(node);
			node.connect(context.destination);

			console.log(self.vol);


		}

	}

	
}



