// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  e2e: {
    //Agoda
    baseUrl: 'https://www.agoda.com',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    env: {
      hideXhr: false,
      // Amazon config
      amazon: {
        baseUrl: 'https://amazon.com',
        viewport: {
          width: 1920,
          height: 1080
        }
      },
      // YouTube config  
      youtube: {
        baseUrl: 'https://www.youtube.com',
        targetVideoPosition: 3,
        category: 'Film',
        viewport: {
          width: 1280,
          height: 720
        },
        timeouts: {
          pageLoad: 60000,
          elementWait: 30000,
          shortWait: 5000
        }
      }
    },
    
    setupNodeEvents(on, config) {
    },
    
    // Global settings
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    
    // Retry configuration
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
})