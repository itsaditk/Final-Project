class SearchResultsPage {
    constructor() {
        this.sortDropdown = () => cy.get('#s-result-sort-select');
        this.productGrid = () => cy.get('[data-component-type="s-search-result"]');
    }

    sortByPriceHighToLow() {
        this.sortDropdown().select('price-desc-rank', { force: true });
        cy.wait(3000); 
        return this;
    }

    selectRightmostNonAdItem() {
    this.productGrid().then($items => {
        const perRow = 4;
        let found = false;

        Cypress._.range(0, perRow).forEach(index => {
            const $el = Cypress.$($items[index]);

            if (!found && !$el.text().includes('Sponsored')) {
                found = true;
                cy.wrap($el).as('selectedProduct');
                cy.wrap($el).find('a').first().click({ force: true });
            }
        });

        if (!found) {
            throw new Error('Tidak ada produk non-iklan di baris pertama.');
        }
    });

    return this;
}



    validateSearchResultsPage() {
        cy.url().should('include', '/s?');
        cy.url().should('include', 'chair');
        this.productGrid().should('have.length.greaterThan', 0);
        return this;
    }

    getSelectedProductInfo() {
        return cy.get('@selectedProduct');
    }
}

module.exports = SearchResultsPage;