class HomePage {
    constructor() {
        this.searchBox = () => cy.get('#twotabsearchtextbox')
        this.searchButton = () => cy.get('#nav-search-submit-button')
    }

    visitAmazon() {
        const amazonConfig = Cypress.env('amazon')
        cy.visit(amazonConfig.baseUrl)
        cy.viewport(amazonConfig.viewport.width, amazonConfig.viewport.height)
    }

    searchItem(searchTerm) {
        this.searchBox().clear().type(searchTerm)
        this.searchButton().click()
    }
}

module.exports = HomePage