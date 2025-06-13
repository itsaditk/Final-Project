const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  e2e: {
    //Agoda
    baseUrl: 'https://www.agoda.com',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Amazon 
    env: {
      hideXhr: false,
      amazon: {
        baseUrl: 'https://amazon.com',
        viewport: {
          width: 1920,
          height: 1080
        }
      }
    },
    setupNodeEvents(on, config) {
    },
  },
})