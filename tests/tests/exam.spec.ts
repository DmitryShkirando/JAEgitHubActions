import { test, expect, chromium } from '@playwright/test';

test.describe('Steam check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://store.steampowered.com/');
  });
  test('Download and coockies', async ({ page, context }) => {
    const logoSteamLocator = await page.locator("//span[@id = 'logo_holder']/*/*");
    const oValveLocator = await page.locator("//a[@href = 'https://valvesoftware.com/about']");
    const installSteamButtonLocator = await page.locator(
      "//div[@class = 'header_installsteam_btn_content']",
    );
    const finalInstallSteamButton = await page.locator(
      "//div[@id ='about_greeting']//a[@class = 'about_install_steam_link']",
    );

    const newPromise = context.waitForEvent('page');

    await expect(logoSteamLocator).toBeVisible();

    await oValveLocator.click({ force: true });

    const newPage = await newPromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.valvesoftware.com/en/about');
    await page.bringToFront();
    await expect(logoSteamLocator).toBeVisible();

    await installSteamButtonLocator.click();
    const downoaldPromise = page.waitForEvent('download');
    await finalInstallSteamButton.click();

    const download = await downoaldPromise;

    const donwnName = download.suggestedFilename();
    expect(donwnName).toBe('SteamSetup.exe');

    await context.addCookies([
      { name: 'Dima', value: 'price', url: 'https://store.steampowered.com/' },
    ]);
    console.log(await context.cookies());
  });
});
