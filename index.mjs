import puppeteer from 'puppeteer';

async function createBrowser() {
  return puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gl-drawing-for-tests',
      '--single-process',
      '--no-zygote',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    headless: 'new',
  });
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
    awaitbrowser.close();
  }
  logProcess();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
