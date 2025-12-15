// 1. Configuración de tonos (Frecuencias originales)
const tones = { verde: 415, rojo: 310, amarillo: 252, azul: 209 };

// 2. Inicializamos el contexto de audio (lazy loading)
let audioCtx;

function playTone(color) {
  // Crear el contexto solo cuando el usuario interactúa
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Si el navegador suspendió el audio, lo reanudamos
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Configuración del sonido
  osc.type = "sine";
  osc.frequency.value = tones[color];

  // Conexiones
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  // Efecto de desvanecimiento (Envelope) para que no suene brusco
  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  // Reproducir y detener
  osc.start(now);
  osc.stop(now + 0.5);
}
