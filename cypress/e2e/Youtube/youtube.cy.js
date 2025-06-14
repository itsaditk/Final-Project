import HomePage from '../../pages/youtube/HomePage';
import TrendingPage from '../../pages/youtube/TrendingPage';
import VideoPage from '../../pages/youtube/VideoPage';

const homePage = new HomePage();
const trendingPage = new TrendingPage();
const videoPage = new VideoPage();

describe('E2E - YouTube Trending Movie Validation', () => {
  before(() => {
    cy.viewport(1280, 720);
  });

  it('Validate trending movie video title and channel after navigation', () => {
    const position = 3;

    homePage.visitHome(); // cy.visit('https://www.youtube.com')
    homePage.clickHamburgerMenu(); // Klik tombol menu (☰)
    homePage.clickTrendingMenu();  // Klik menu 'Trending'

    trendingPage.selectCategory('Film'); // Klik tab "Film"

    trendingPage.getVideoCard(position).then(($card) => {
      const title = $card.find('#video-title').text().trim();
      const channel = $card.find('ytd-channel-name a').text().trim();

      cy.wrap($card).click();
    });
});
})