// @ts-check
const { test, expect } = require('@playwright/test');
const Homepage = require('../pages/Homepage').default;

// Ensures homepage is available in the scope of the entire test file
let homepage;

/**
 * Creates the homepage object and navigates to the homepage before each test
 */
test.beforeEach(async ({ page }) => {
  
  // Initialize the homepage object with the current page
  homepage = new Homepage(page);

  // Method call to navigate to the homepage url
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
    
    // Method call to verify that the logo is visible 
    const logoVisible = await homepage.isLogoVisible();

    // Assert that the method call returns true verifying that the logo is visible
    expect(logoVisible).toBeTruthy();
  });

  /**
   * Verifies that the search bar is visible on the homepage
   */  
  test('test that search input is available', async() => {

    // Method call to verify that the search bar is visible
    const searchVisible = await homepage.isSearchVisible();

    // Assert that the method call returns true verifying that the search bar is visible
    expect(searchVisible).toBeTruthy();
  });

  /**
   * Verifies that the sign-in link is visible on the homepage
   */  
  test('test that sign-in link is visible', async() => {

    // Method call to verify that the link to sign in is visible
    const signInLinkVisible = await homepage.isSignInLinkVisible();

    // Assert that the method call returns true verifying that the sign in link is visible
    expect(signInLinkVisible).toBeTruthy();
  });

  /**
   * Verifies that the shopping cart is visible on the homepage
   */
  test('test that shopping cart icon is visible', async() => {

    // Method call to verify that the cart icon is visible
    const cartIconVisible = await homepage.isCartVisible();

    // Assert that the method returns true verifying that the cart icon is visible
    expect(cartIconVisible).toBeTruthy();
  });

  /**
   * Verifies that the footer links are visible
   */
  test('test that footer link "Help & Contact" is visible', async() => {

    // Method call to verify that the Help & Contact footer link is visible
    const footerLinkVisible = await homepage.isFooterLinkVisible('Help & Contact');

    // Assert that the method returns true verifying that the footer link is visible
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

    // Method call to navigate to the Electronics section on the navbar
    await homepage.navbar('Electronics');

    // Assert that the new url contains the word "Electronics" indicating it successfully redirected
    expect(homepage.page.url()).toContain("Electronics");
  });

  /**
   * Verify that clicking "Daily Deals" navigates properly
   */  
  test('test that "daily deals" link works', async() => {

    // Method call to navigate to the Daily Deals section
    await homepage.dailyDeals();

    // Assert that the url contains the word "deals" indicating it successfully redirected
    expect(homepage.page.url()).toContain('deals');
  });

  /**
   * Verifies that using the search bar properly navigates
   */
  test("test that search functionality works from the homepage", async() => {

    // Method call to type "shoes" is the search bar and search
    await homepage.searchFor("shoes");

    // Assert that the url contains the word "shoes" indicating it successfully searched
    expect(homepage.page.url()).toContain("shoes");
  });

});

