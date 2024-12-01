import puppeteer from 'puppeteer';
import { exec } from 'child_process';

async function createBrowser() {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-dev-shm-usage',
      '--disable-features=VizDisplayCompositor',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-client-side-phishing-detection',
      '--disable-default-apps',
      '--disable-gpu',
      '--disable-renderer-backgrounding',
      '--disable-sync',
      '--disable-translate',
      '--metrics-recording-only',
      '--no-first-run',
      '--no-sandbox',
      '--safebrowsing-disable-auto-update',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-site-isolation-trials',
      '--renderer-process-limit=1', // Limit renderer threads
      '--max-connections-per-host=10', // Limit network connections
    ],
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
  for (let i = 0; i < 50; i++) {
    const browser = await createBrowser();
    console.log('created browser', i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const browserProcess = browser.process();
    // await browser.close();
    // if (browserProcess) browserProcess.kill();
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
