import { KokoroTTS } from 'kokoro-js';
import { env } from '@huggingface/transformers';

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
env.backends.onnx.wasm.wasmPaths = '/assets/onnxruntime/';
let modelPromise;
let audioContext;
let activeSource;
let requestId = 0;

function audioEngine() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) throw new Error('Este navegador não oferece reprodução de áudio local.');
  audioContext ||= new AudioContextClass();
  return audioContext;
}

export function unlockPlayback() {
  try { return audioEngine().resume(); } catch { return Promise.resolve(); }
}

export function stop() {
  requestId += 1;
  if (activeSource) {
    activeSource.onended = null;
    try { activeSource.stop(); } catch { /* áudio já encerrado */ }
    activeSource = null;
  }
}

function splitForSpeech(text) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks = [];
  let chunk = '';
  for (const sentence of sentences) {
    if (chunk && (chunk.length + sentence.length > 360)) {
      chunks.push(chunk.trim());
      chunk = '';
    }
    chunk += sentence;
  }
  if (chunk.trim()) chunks.push(chunk.trim());
  return chunks;
}

async function loadModel(onStatus) {
  if (!modelPromise) {
    modelPromise = KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'wasm',
      progress_callback: (progress) => {
        if (progress.status === 'progress' && Number.isFinite(progress.progress)) {
          onStatus?.(`Baixando voz neural local · ${Math.round(progress.progress)}%`);
        }
      }
    }).catch((error) => {
      modelPromise = null;
      throw error;
    });
  }
  onStatus?.('Preparando voz neural masculina…');
  return modelPromise;
}

export async function speak(text, { onStart, onEnd, onStatus } = {}) {
  stop();
  const current = requestId;
  const context = audioEngine();
  try {
    const model = await loadModel(onStatus);
    if (current !== requestId) return false;

    const chunks = splitForSpeech(text);
    for (const [index, chunk] of chunks.entries()) {
      if (current !== requestId) return false;
      const audio = await model.generate(chunk, { voice: 'pm_alex', speed: 0.96 });
      if (current !== requestId) return false;
      await context.resume();
      const buffer = context.createBuffer(1, audio.audio.length, audio.sampling_rate);
      buffer.copyToChannel(audio.audio, 0);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      activeSource = source;
      if (index === 0) onStart?.();
      await new Promise((resolve) => {
        source.onended = () => { activeSource = null; resolve(); };
        source.start();
      });
    }
    if (current === requestId) onEnd?.();
    return true;
  } catch (error) {
    if (current === requestId) throw error;
    return false;
  }
}
