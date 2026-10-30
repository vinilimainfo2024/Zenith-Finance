const fs = require('node:fs');
const path = require('node:path');
const { build } = require('esbuild');

const root = __dirname;
const runtimeSource = path.join(root, 'node_modules', 'onnxruntime-web', 'dist');
const runtimeTarget = path.join(root, 'assets', 'onnxruntime');

async function main() {
  await build({
    entryPoints: [path.join(root, 'tts-client.js')],
    bundle: true,
    format: 'iife',
    globalName: 'SteevVoice',
    platform: 'browser',
    target: ['es2022'],
    loader: { '.wasm': 'file' },
    assetNames: 'assets/[name]-[hash]',
    outfile: path.join(root, 'tts-client.bundle.js')
  });

  fs.mkdirSync(runtimeTarget, { recursive: true });
  for (const name of ['ort-wasm-simd-threaded.mjs', 'ort-wasm-simd-threaded.wasm']) {
    fs.copyFileSync(path.join(runtimeSource, name), path.join(runtimeTarget, name));
  }
  console.log('Runtime local da voz neural preparado.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
