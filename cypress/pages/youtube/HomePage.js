class HomePage {
  visitHome() {
    cy.visit(Cypress.env('youtube').baseUrl)
  }

  clickHamburgerMenu() {
    cy.get('yt-icon-button#guide-button button').first().click()
  }

  clickTrendingMenu() {
    cy.contains('a', 'Trending').scrollIntoView().click({ force: true })
    cy.wait(3000) 
  }
  
}

export default HomePage
