function VolumeSample3() {
  loadSounds(this, {
    buffer: 'horse.wav'
  }, onLoaded);
  function onLoaded() {
    var button = document.querySelector('button');
    button.removeAttribute('disabled');
    button.innerHTML = 'Play/pause';
  };
  this.isPlaying = false;
};

VolumeSample3.prototype.play = function() {
  this.gainNode = context.createGain();
  this.source = context.createBufferSource();
  this.source.buffer = this.buffer;

  // Connect source to a gain node
  this.source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  // Start playback in a loop
  this.source.loop = true;
  this.source[this.source.start ? 'start' : 'noteOn'](0);
};

VolumeSample3.prototype.changeVolume = function(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = fraction * fraction;
};

VolumeSample3.prototype.stop = function() {
  this.source[this.source.stop ? 'stop' : 'noteOff'](0);
};

VolumeSample3.prototype.toggle = function() {
  this.isPlaying ? this.stop() : this.play();
  this.isPlaying = !this.isPlaying;
};