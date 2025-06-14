class VideoPage {
  getVideoTitle() {
    return cy.get('h1.title').find('yt-formatted-string')
  }

  getChannelName() {
    return cy.get('#text-container yt-formatted-string').first()
  }
}

export default VideoPage
