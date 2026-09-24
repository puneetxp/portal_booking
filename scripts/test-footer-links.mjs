import { chromium } from 'playwright';

const BASE_URL = process.env.TARGET_URL || 'http://localhost:3000';

async function testFooterLinks() {
  console.log('='.repeat(65));
  console.log('🧪 FOOTER LINKS AUTOMATED VERIFICATION SUITE');
  console.log('='.repeat(65));
  console.log(`🌐 Target: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
    }
  }

  try {
    console.log('⏳ Navigating to homepage...');
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Scroll to footer
    const footer = page.locator('#main-footer');
    await footer.scrollIntoViewIfNeeded();
    console.log('  Footer is in view.\n');

    // 1. Test Home Logo Link
    console.log('📌 [1/5] Testing Logo Link in Footer:');
    const logoLink = footer.locator('a[aria-label="Bus Arabia Home"]');
    assert((await logoLink.count()) > 0, 'Logo link exists in footer');
    const logoHref = await logoLink.getAttribute('href');
    assert(logoHref === '/', `Logo link points to "/" (got: "${logoHref}")`);

    // 2. Test Social Channel Links
    console.log('\n📌 [2/5] Testing 6 Social Media Channel Links:');
    const expectedSocials = [
      { name: 'WhatsApp', url: 'https://wa.me/966500000000' },
      { name: 'Instagram', url: 'https://www.instagram.com/busarabia' },
      { name: 'YouTube', url: 'https://www.youtube.com/@busarabia' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/busarabia' },
      { name: 'Facebook', url: 'https://www.facebook.com/busarabia' },
      { name: 'X (Twitter)', url: 'https://x.com/busarabia' },
    ];

    for (const social of expectedSocials) {
      const link = footer.locator(`a[aria-label="${social.name}"]`);
      assert((await link.count()) > 0, `${social.name} link exists`);
      const href = await link.getAttribute('href');
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');
      assert(href === social.url, `${social.name} href is "${social.url}"`);
      assert(target === '_blank', `${social.name} opens in new tab (target="_blank")`);
      assert(rel && rel.includes('noopener'), `${social.name} has security rel="noopener noreferrer"`);
    }

    // 3. Test Company Links
    console.log('\n📌 [3/5] Testing Company Links:');
    const expectedCompany = [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Our Bus Operators', href: '/operators' },
    ];

    for (const comp of expectedCompany) {
      const link = footer.locator(`a[aria-label="${comp.name}"]`);
      assert((await link.count()) > 0, `"${comp.name}" link exists in footer`);
      const href = await link.getAttribute('href');
      assert(href === comp.href, `"${comp.name}" points to "${comp.href}" (got: "${href}")`);
    }

    // 4. Test Information Links
    console.log('\n📌 [4/5] Testing Information Links:');
    const expectedInfo = [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cancellation, Modification & Refund Policy', href: '/cancellation-policy' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ];

    for (const info of expectedInfo) {
      const link = footer.locator(`a[aria-label="${info.name}"]`);
      assert((await link.count()) > 0, `"${info.name}" link exists in footer`);
      const href = await link.getAttribute('href');
      assert(href === info.href, `"${info.name}" points to "${info.href}" (got: "${href}")`);
    }

    // 5. Test Payment Badges Tooltips & Operator Login Button
    console.log('\n📌 [5/5] Testing Payment Badges & Operator Login Button:');
    const expectedPayments = [
      'Visa', 'Mada', 'STC Pay',
      'Mastercard', 'American Express', 'Google Pay',
      'Samsung Pay', 'Apple Pay', 'Union Pay',
    ];
    for (const p of expectedPayments) {
      const badge = footer.locator(`span[title="We accept ${p}"]`);
      assert((await badge.count()) > 0, `Payment badge tooltip for "${p}" exists`);
    }

    const operatorBtn = footer.locator('a[aria-label="Bus Operator Sign in / Sign up"]');
    assert((await operatorBtn.count()) > 0, 'Bus Operator Sign in / Sign up button exists');
    const opHref = await operatorBtn.getAttribute('href');
    assert(opHref === '#operator-portal', `Operator button points to "#operator-portal" (got: "${opHref}")`);

    // Navigation Verification: Click an internal link to ensure routing works
    console.log('\n🚀 Verifying real browser navigation by clicking "About Us"...');
    await footer.locator('a[aria-label="About Us"]').click();
    await page.waitForURL('**/about', { timeout: 10000 });
    const currentUrl = page.url();
    assert(currentUrl.endsWith('/about'), `Successfully navigated to "${currentUrl}"`);

  } catch (err) {
    console.error('Fatal error during footer test:', err);
    totalTests++;
  } finally {
    await browser.close();
  }

  console.log('\n' + '='.repeat(65));
  console.log(`📊 TEST SUMMARY: ${passedTests}/${totalTests} tests passed (${((passedTests/totalTests)*100).toFixed(1)}%)`);
  console.log('='.repeat(65));

  if (passedTests === totalTests) {
    console.log('🎉 ALL FOOTER LINKS ARE FULLY VERIFIED AND FUNCTIONAL!\n');
    process.exit(0);
  } else {
    console.error('⚠️ Some footer link tests failed.\n');
    process.exit(1);
  }
}

testFooterLinks();
