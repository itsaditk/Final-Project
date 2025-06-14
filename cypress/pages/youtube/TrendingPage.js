class TrendingPage {
  selectCategory(categoryName) {
    cy.url({ timeout: 15000 }).should('include', '/feed/trending')
    cy.get('yt-tab-shape[tab-title="Film"]').click();
  }

  getVideoCard(position) {
    return cy.get('ytd-video-renderer', { timeout: 10000 }).eq(position - 1)
  }

  getVideoTitleFromCard(card) {
    return card.find('#video-title')
  }

  getChannelNameFromCard(card) {
    return card.find('ytd-channel-name a')
  }

  clickVideo(card) {
    this.getVideoTitleFromCard(card).click()
  }
}

export default TrendingPage
