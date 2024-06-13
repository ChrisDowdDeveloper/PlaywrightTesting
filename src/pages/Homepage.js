class Homepage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.ebay.com');
    }

    async isLogoVisible() {
        const logo = await this.page.getByRole('link', { name: 'eBay Home' });
        return logo.isVisible();
    }

    async isSearchVisible() {
        const search = await this.page.getByPlaceholder('Search for anything')
        return search.isVisible();
    }

    async isSignInLinkVisible() {
        const signInLink = await this.page.getByRole('link', { name: 'Sign in' });
        return signInLink.isVisible();
    }

    async isCartVisible() {
        const cartIcon = await this.page.getByRole('link', { name: 'Your shopping cart' });
        return cartIcon.isVisible();
    }

    async isFooterLinkVisible(linkName) {
        const footerLink = await this.page.getByRole('heading', { name: linkName }).getByRole('link');
        return footerLink.isVisible();
    }

    async searchFor(item) {
        await this.page.getByPlaceholder('Search for anything').click();
        await this.page.getByPlaceholder('Search for anything').fill(item);
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async dailyDeals() {
        await this.page.getByRole('link', { name: 'Daily Deals' }).click();
    }

    async navbar(linkName) {
        await this.page.getByRole('link', { name: linkName, exact: true }).click();
    }
}

export default Homepage;