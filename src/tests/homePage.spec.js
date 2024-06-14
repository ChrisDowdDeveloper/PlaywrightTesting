// @ts-check
const { test, expect } = require('@playwright/test');
const Homepage = require('../pages/Homepage').default;

let homepage;

test.beforeEach(async ({ page }) => {
  homepage = new Homepage(page);
  await homepage.goto();
});

test.describe("Homepage visiblilty", () => {

  test('test that logo is visible', async() => {
    const logoVisible = await homepage.isLogoVisible();
    expect(logoVisible).toBeTruthy();
  });

  test('test that search input is available', async() => {
    const searchVisible = await homepage.isSearchVisible();
    expect(searchVisible).toBeTruthy();
  });

  test('test that sign-in link is visible', async() => {
    const signInLinkVisible = await homepage.isSignInLinkVisible();
    expect(signInLinkVisible).toBeTruthy();
  });

  test('test that shopping cart icon is visible', async() => {
    const cartIconVisible = await homepage.isCartVisible();
    expect(cartIconVisible).toBeTruthy();
  });

  test('test that footer link "Help & Contact" is visible', async() => {
    const footerLinkVisible = await homepage.isFooterLinkVisible('Help & Contact');
    expect(footerLinkVisible).toBeTruthy();
  });

});

test.describe("Homepage functionality", () => {

  test('test that navbar functionality works', async({ page }) => {
    await homepage.navbar('Electronics');
    expect(page.url()).toContain("Electronics");
  });

  test('test that "daily deals" link works', async({ page }) => {
    await homepage.dailyDeals();
    expect(page.url()).toContain('deals');
  });

  test("test that search functionality works", async({ page }) => {
    await homepage.searchFor("shoes");
    expect(page.url()).toContain("shoes");
  });

});

