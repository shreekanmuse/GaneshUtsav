import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Starting pamphlet rendering...');
  
  // Launch browser with appropriate settings
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to A4 dimensions (approximately 794x1123 at 96 DPI)
  // Scale factor = 3.5 is ideal for ultra-sharp 300+ DPI equivalent outputs
  await page.setViewport({
    width: 794,
    height: 1123,
    deviceScaleFactor: 3.5
  });

  const filePath = `file://${path.resolve(__dirname, 'index.html').replace(/\\/g, '/')}`;
  console.log(`Loading: ${filePath}`);
  
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Render merged PDF
  console.log('Generating merged PDF...');
  await page.pdf({
    path: path.join(__dirname, 'Ganesh_Utsav_Brochure.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    preferCSSPageSize: true
  });
  console.log('PDF Generated successfully: Ganesh_Utsav_Brochure.pdf');

  // Screenshot individual pages
  const pageSelectors = ['.page-1', '.page-2', '.page-3', '.page-4'];
  for (let i = 0; i < pageSelectors.length; i++) {
    const selector = pageSelectors[i];
    const pageNum = i + 1;
    console.log(`Screenshotting Page ${pageNum} (${selector})...`);
    
    // Find the element
    const element = await page.$(selector);
    if (element) {
      await element.screenshot({
        path: path.join(__dirname, `Page_${pageNum}.png`),
        type: 'png'
      });
      console.log(`Saved: Page_${pageNum}.png`);
    } else {
      console.error(`Error: Could not find page selector ${selector}`);
    }
  }

  await browser.close();
  console.log('Pamphlet rendering completed successfully!');
}

run().catch(err => {
  console.error('Render failed:', err);
  process.exit(1);
});
