const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:5174';

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();

    try {
        await page.goto(TARGET_URL);
        console.log('Page loaded');

        // Select Dr. Mundo
        await page.click('text=Dr. Mundo');
        await page.waitForTimeout(1000);

        // Set level to 18
        const levelSlider = page.locator('input[type="range"]');
        await levelSlider.fill('18');
        console.log('Level set to 18');
        await page.waitForTimeout(500);

        // Level up E to rank 1
        const ePlus = page.locator('.skill-rank-row').filter({ hasText: 'E' }).locator('button:has-text("+")');
        await ePlus.click();
        console.log('E rank incremented');

        // Get E description before item
        const eDescBefore = await page.innerText('.ability-card:has-text("Blunt Force Trauma") .ability-card-desc');
        console.log('--- E Description (Before) ---');
        console.log(eDescBefore);

        // Search and equip Heartsteel (gives 700 HP)
        const itemSearchInput = page.locator('input[placeholder="Search items..."]');
        await itemSearchInput.fill("Heartsteel");
        await page.waitForTimeout(500);

        // Click the first item in the catalog
        await page.click('.catalog-item');
        console.log('Heartsteel equipped');
        await page.waitForTimeout(1000);

        // Get E description after item
        const eDescAfter = await page.innerText('.ability-card:has-text("Blunt Force Trauma") .ability-card-desc');
        console.log('--- E Description (After) ---');
        console.log(eDescAfter);

        await page.screenshot({ path: 'c:/Users/Pc/Desktop/lol objects/hp_scaling_test_v2.png' });
        console.log('Screenshot saved to c:/Users/Pc/Desktop/lol objects/hp_scaling_test_v2.png');

    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await browser.close();
    }
})();
