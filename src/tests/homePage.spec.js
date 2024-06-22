// @ts-check
const { test, expect } = require('@playwright/test');
const Homepage = require('../pages/Homepage').default;

// Ensures homepage is available in the scope of the entire test file
let homepage;

/**
 * Creates the homepage object and navigates to the homepage before each test
 */
test.beforeEach(async ({ page }) => {
  homepage = new Homepage(page);
  await homepage.goto();
});

/**
 * Group of tests to verify the visibility of elements on the homepage
 */
test.describe("Homepage visiblilty", () => {

  /**
   * Verifies that the EBay logo is visible on the homepage
   */
  test('test that logo is visible', async() => {
    const logoVisible = await homepage.isLogoVisible();
    expect(logoVisible).toBeTruthy();
  });

  /**
   * Verifies that the search bar is visible on the homepage
   */  
  test('test that search input is available', async() => {
    const searchVisible = await homepage.isSearchVisible();
    expect(searchVisible).toBeTruthy();
  });

  /**
   * Verifies that the sign-in link is visible on the homepage
   */  
  test('test that sign-in link is visible', async() => {
    const signInLinkVisible = await homepage.isSignInLinkVisible();
    expect(signInLinkVisible).toBeTruthy();
  });

  /**
   * Verifies that the shopping cart is visible on the homepage
   */
  test('test that shopping cart icon is visible', async() => {
    const cartIconVisible = await homepage.isCartVisible();
    expect(cartIconVisible).toBeTruthy();
  });

  /**
   * Verifies that the footer links are visible
   */
  test('test that footer link "Help & Contact" is visible', async() => {
    const footerLinkVisible = await homepage.isFooterLinkVisible('Help & Contact');
    expect(footerLinkVisible).toBeTruthy();
  });

});

/**
  * Group of tests to check the functionality of features on the homepage
  */
test.describe("Homepage functionality", () => {

  /**
   * Verifies that the navigating to items on the navbar works
   */  
  test('test that navbar functionality works', async() => {
    await homepage.navbar('Electronics');
    expect(homepage.page.url()).toContain("Electronics");
  });

  /**
   * Verify that clicking "Daily Deals" navigates properly
   */  
  test('test that "daily deals" link works', async() => {
    await homepage.dailyDeals();
    expect(homepage.page.url()).toContain('deals');
  });

  /**
   * Verifies that using the search bar properly navigates
   */
  test("test that search functionality works from the homepage", async() => {
    await homepage.searchFor("shoes");
    expect(homepage.page.url()).toContain("shoes");
  });

});

