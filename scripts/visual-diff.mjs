import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DEFAULT_URL = process.env.TARGET_URL || 'http://localhost:3000';
const DEFAULT_BASELINE = process.env.BASELINE_IMAGE || path.join(rootDir, 'tests/visual/baseline/2252-3420.png');
const OUTPUT_DIR = path.join(rootDir, 'tests/visual/output');
const VIEWPORT_WIDTH = 1280;
const THRESHOLD = 0.1; // Tolerance for font anti-aliasing variations

async function runVisualDiff() {
  console.log('='.repeat(65));
  console.log('🎨 FIGMA vs LOCALHOST 1:1 PIXEL-BY-PIXEL COMPARISON');
  console.log('='.repeat(65));
  console.log(`🌐 Target URL:     ${DEFAULT_URL}`);
  console.log(`📐 Viewport:       ${VIEWPORT_WIDTH}px (Figma Canvas: 1280px)`);
  console.log(`🖼️  Figma Baseline: ${path.relative(rootDir, DEFAULT_BASELINE)}`);

  if (!fs.existsSync(DEFAULT_BASELINE)) {
    console.error(`❌ Figma baseline image not found at: ${DEFAULT_BASELINE}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 1. Read Figma Baseline Image
  console.log('\n⏳ [1/4] Loading Figma baseline PNG...');
  const baselineData = fs.readFileSync(DEFAULT_BASELINE);
  const baselinePng = PNG.sync.read(baselineData);
  console.log(`   Baseline dimensions: ${baselinePng.width}x${baselinePng.height} px`);

  // 2. Launch Headless Chromium & Capture localhost:3000
  console.log('\n⏳ [2/4] Launching Headless Chromium & capturing web page...');
  const browser = await chromium.launch({
    args: ['--font-render-hinting=none', '--disable-font-subpixel-positioning']
  });
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_WIDTH, height: baselinePng.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    await page.goto(DEFAULT_URL, { waitUntil: 'networkidle', timeout: 30000 });
  } catch (err) {
    console.warn(`   ⚠️ Warning: networkidle wait exceeded, proceeding with DOM content loaded: ${err.message}`);
  }

  // Wait for fonts & disable CSS animations for 100% deterministic screenshot
  await page.evaluate(async () => {
    await document.fonts.ready;
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
  });

  await page.waitForTimeout(1500);

  const currentScreenshotPath = path.join(OUTPUT_DIR, 'current.png');
  const screenshotBuffer = await page.screenshot({
    path: currentScreenshotPath,
    fullPage: false,
    clip: { x: 0, y: 0, width: VIEWPORT_WIDTH, height: baselinePng.height }
  });
  await browser.close();

  const currentPng = PNG.sync.read(screenshotBuffer);
  console.log(`   Current page captured: ${currentPng.width}x${currentPng.height} px`);

  // 3. Pixel-by-pixel comparison
  console.log('\n⏳ [3/4] Running pixelmatch comparison (Figma vs Browser)...');
  const width = Math.min(baselinePng.width, currentPng.width);
  const height = Math.min(baselinePng.height, currentPng.height);

  // Crop / normalize both to equal bounds if needed
  const normalizedBaseline = new PNG({ width, height });
  PNG.bitblt(baselinePng, normalizedBaseline, 0, 0, width, height, 0, 0);

  const normalizedCurrent = new PNG({ width, height });
  PNG.bitblt(currentPng, normalizedCurrent, 0, 0, width, height, 0, 0);

  const diffPng = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(
    normalizedBaseline.data,
    normalizedCurrent.data,
    diffPng.data,
    width,
    height,
    {
      threshold: THRESHOLD,
      includeAA: false,
      diffColor: [255, 0, 85], // Neon Red/Pink for mismatches
      aaColor: [255, 200, 0],   // Yellow for subtle antialiasing
    }
  );

  const diffPath = path.join(OUTPUT_DIR, 'diff.png');
  fs.writeFileSync(diffPath, PNG.sync.write(diffPng));

  // Copy baseline into output directory for self-contained HTML viewing
  const baselineCopyPath = path.join(OUTPUT_DIR, 'baseline.png');
  fs.copyFileSync(DEFAULT_BASELINE, baselineCopyPath);

  const totalPixels = width * height;
  const matchedPixels = totalPixels - mismatchedPixels;
  const matchPercentage = ((matchedPixels / totalPixels) * 100).toFixed(2);
  const mismatchPercentage = ((mismatchedPixels / totalPixels) * 100).toFixed(2);

  // Generate Interactive HTML Report
  const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pixel-by-Pixel Figma vs Web Design QA</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    body { background: #0f1117; color: #e1e4ea; padding: 24px; }
    .header { max-width: 1400px; margin: 0 auto 24px; background: #1a1d27; border: 1px solid #2d3345; border-radius: 12px; padding: 20px 28px; }
    .title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    h1 { font-size: 22px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; }
    .badge { padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 700; }
    .badge-warn { background: #e0245e22; color: #ff3366; border: 1px solid #ff336655; }
    .badge-ok { background: #00ba7c22; color: #00ba7c; border: 1px solid #00ba7c55; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 12px; }
    .stat-card { background: #131620; padding: 14px 18px; border-radius: 8px; border: 1px solid #232838; }
    .stat-label { font-size: 11px; text-transform: uppercase; color: #8b949e; letter-spacing: 0.5px; }
    .stat-value { font-size: 20px; font-weight: 700; color: #fff; margin-top: 4px; }
    .controls { max-width: 1400px; margin: 0 auto 20px; display: flex; gap: 12px; align-items: center; }
    .btn { background: #232838; color: #fff; border: 1px solid #3b435b; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    .btn.active { background: #b20163; border-color: #b20163; }
    .slider-box { display: flex; align-items: center; gap: 10px; margin-left: auto; font-size: 13px; }
    .main-view { max-width: 1400px; margin: 0 auto; background: #1a1d27; border: 1px solid #2d3345; border-radius: 12px; padding: 20px; overflow-x: auto; }
    .tabs-content { position: relative; }
    .side-by-side { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .column { display: flex; flex-direction: column; gap: 8px; }
    .col-title { font-size: 13px; font-weight: 700; text-align: center; padding: 6px; border-radius: 4px; background: #232838; }
    .col-img { width: 100%; border: 1px solid #2d3345; border-radius: 6px; }
    .onion-container { position: relative; width: ${width}px; margin: 0 auto; border: 1px solid #2d3345; border-radius: 6px; overflow: hidden; }
    .onion-layer { width: 100%; display: block; }
    .onion-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-row">
      <h1>🎯 Pixel-by-Pixel Visual Diff Report</h1>
      <span class="badge ${parseFloat(matchPercentage) >= 99 ? 'badge-ok' : 'badge-warn'}">
        ${matchPercentage}% Match (${mismatchPercentage}% Mismatch)
      </span>
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Target Page</div>
        <div class="stat-value" style="font-size: 15px;">${DEFAULT_URL}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Canvas Size</div>
        <div class="stat-value">${width} × ${height} px</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Matched Pixels</div>
        <div class="stat-value" style="color: #00ba7c;">${matchedPixels.toLocaleString()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Diff Pixels</div>
        <div class="stat-value" style="color: #ff3366;">${mismatchedPixels.toLocaleString()}</div>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="btn active" id="btn-side" onclick="switchView('side')">Side by Side (3-Way)</button>
    <button class="btn" id="btn-onion" onclick="switchView('onion')">Onion Skin (Figma vs Web)</button>
    <button class="btn" id="btn-diff" onclick="switchView('diff')">Diff Map Focus</button>
    
    <div class="slider-box" id="opacity-control" style="display: none;">
      <span>Figma Opacity:</span>
      <input type="range" id="opacity-range" min="0" max="100" value="50" oninput="updateOpacity(this.value)" />
      <span id="opacity-val">50%</span>
    </div>
  </div>

  <div class="main-view">
    <div id="view-side" class="side-by-side">
      <div class="column">
        <div class="col-title" style="color: #60a5fa;">1. Figma Baseline (${width}px)</div>
        <img class="col-img" src="baseline.png" alt="Figma Baseline" />
      </div>
      <div class="column">
        <div class="col-title" style="color: #34d399;">2. Localhost:3000 (${width}px)</div>
        <img class="col-img" src="current.png" alt="Browser Current" />
      </div>
      <div class="column">
        <div class="col-title" style="color: #f43f5e;">3. Visual Diff Map (Red = Mismatch)</div>
        <img class="col-img" src="diff.png" alt="Visual Diff" />
      </div>
    </div>

    <div id="view-onion" class="onion-container" style="display: none;">
      <img class="onion-layer" src="current.png" alt="Web" />
      <img id="onion-top" class="onion-overlay" src="baseline.png" style="opacity: 0.5;" alt="Figma" />
    </div>

    <div id="view-diff" style="display: none; text-align: center;">
      <img src="diff.png" style="max-width: 100%; border: 1px solid #2d3345; border-radius: 8px;" alt="Diff Map" />
    </div>
  </div>

  <script>
    function switchView(mode) {
      document.getElementById('view-side').style.display = mode === 'side' ? 'grid' : 'none';
      document.getElementById('view-onion').style.display = mode === 'onion' ? 'block' : 'none';
      document.getElementById('view-diff').style.display = mode === 'diff' ? 'block' : 'none';
      document.getElementById('opacity-control').style.display = mode === 'onion' ? 'flex' : 'none';
      
      document.getElementById('btn-side').classList.toggle('active', mode === 'side');
      document.getElementById('btn-onion').classList.toggle('active', mode === 'onion');
      document.getElementById('btn-diff').classList.toggle('active', mode === 'diff');
    }

    function updateOpacity(val) {
      document.getElementById('onion-top').style.opacity = val / 100;
      document.getElementById('opacity-val').innerText = val + '%';
    }
  </script>
</body>
</html>
`;
  const reportPath = path.join(OUTPUT_DIR, 'report.html');
  fs.writeFileSync(reportPath, reportHtml);

  // 4. Report Results
  console.log('\n📊 [4/4] COMPARISON REPORT:');
  console.log('='.repeat(65));
  console.log(`Total Compared Pixels:  ${totalPixels.toLocaleString()}`);
  console.log(`✅ Matched Pixels:       ${matchedPixels.toLocaleString()} (${matchPercentage}%)`);
  console.log(`❌ Mismatched Pixels:    ${mismatchedPixels.toLocaleString()} (${mismatchPercentage}%)`);
  console.log('='.repeat(65));
  console.log(`📁 Artifacts Saved to:   ${path.relative(rootDir, OUTPUT_DIR)}`);
  console.log(`   • Interactive HTML:   ${path.relative(rootDir, reportPath)}`);
  console.log(`   • Figma Baseline:     ${path.relative(rootDir, baselineCopyPath)}`);
  console.log(`   • Browser Capture:    ${path.relative(rootDir, currentScreenshotPath)}`);
  console.log(`   • Visual Diff Map:    ${path.relative(rootDir, diffPath)}`);
  console.log('='.repeat(65));

  if (parseFloat(matchPercentage) >= 99.0) {
    console.log('🎉 1:1 Pixel Match SUCCESS (>= 99% match, within font antialiasing variance)!');
  } else {
    console.log(`⚠️  Visual discrepancies detected (${mismatchPercentage}% diff). Open diff.png to inspect highlighted areas.`);
  }
}

runVisualDiff().catch((err) => {
  console.error('Fatal error running visual diff:', err);
  process.exit(1);
});
