import puppeteer from 'puppeteer';
import { exec } from 'child_process';

async function createBrowser() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    headless: 'new',
  });

  // Ensure browser process is handled properly
  const browserProcess = browser.process();
  browserProcess.on('exit', () => {
    console.log(`Browser process ${browserProcess.pid} exited`);
  });

  return browser;
}

const logProcess = () => {
  exec(
    'cat /proc/sys/kernel/pid_max; ps -ax | wc -l',
    (error, stdout, stderr) => {
      const [pidMax, currentProcesses] = stdout.trim().split('\n');
      console.log(`Total system processes: ${currentProcesses}/${pidMax}`);
    }
  );
};

async function run() {
  // Check process limit and current count
  logProcess();
  for (let i = 0; i < 10; i++) {
    const browser = await createBrowser();
    console.log('created browser', i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const browserProcess = browser.process();
    await browser.close();
    if (browserProcess) browserProcess.kill();
  }
  logProcess();
  exec('ps -aux | grep chrome', (error, stdout) => {
    console.log(`Chrome processes:\n${stdout}`);
  });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
