import puppeteer from 'puppeteer';

async function createBrowser() {
  return puppeteer.launch({
    args: [
      '--enable-logging=stderr',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // This might increase memory consumption
      '--disable-gpu',
    ],
    headless: 'new',
  });
}

async function run() {
  for (let i = 0; i < 50; i++) {
    const browser = await createBrowser();
    console.log('created browser', i);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
