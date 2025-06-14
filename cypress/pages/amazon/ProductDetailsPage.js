class ProductDetailsPage {
    constructor() {
        this.productTitle = () => cy.get('#productTitle')
        this.productPrice = () => cy.get('.a-price-whole').first()
    }

    validateProductDetails(expectedName, expectedPrice) {
        cy.url().should('include', '/dp/')
        
        this.productTitle().should('be.visible')
        this.productTitle().invoke('text').should('include', 'Chair')
        
        this.productPrice().should('be.visible')
        
        return this.getProductDetails()
    }

    getProductDetails() {
    let productInfo = {}

    return this.productTitle().invoke('text').then((titleText) => {
        productInfo.name = titleText.trim()

        return cy.get("div.a-section.a-spacing-micro span.a-offscreen").first().invoke("text").then((priceText) => {
            productInfo.price = priceText.trim()

            cy.log(`Final Product Name: ${productInfo.name}`)
            cy.log(`Final Product Price: ${productInfo.price}`)

            return cy.wrap(productInfo)
        })
    })
}

}

module.exports = ProductDetailsPage