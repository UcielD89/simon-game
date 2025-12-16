"use strict";
var tones = { verde: 415, rojo: 310, amarillo: 252, azul: 209 };
var audioCtx;
function playTone(color) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = tones[color];
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  var now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  osc.start(now);
  osc.stop(now + 0.5);
}
