import { fork } from 'child_process';
import path from 'path';

const scriptPath = path.resolve('./startBrowser.mjs');

async function startProcesses() {
  for (let i = 0; i < 50; i++) {
    const child = fork(scriptPath);
    child.on('message', (msg) => {
      console.log(`Child ${i} message:`, msg);
    });
    child.on('exit', (code) => {
      console.log(`Child ${i} exited with code ${code}`);
    });
    console.log('Started process', i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

startProcesses().catch((e) => {
  console.error(e);
  process.exit(1);
});
