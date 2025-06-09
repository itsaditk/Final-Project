const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.agoda.com',
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    PASSENGER_FIRST_NAME: 'Adit',
    PASSENGER_LAST_NAME: 'Kurniawan',
    PASSENGER_EMAIL: 'aditKurniawan@example.com',
    PASSENGER_PHONE: '81234567890',
    PASSENGER_DOB_DATE: '28',
    PASSENGER_DOB_MONTH: 'August',
    PASSENGER_DOB_YEAR: '1999',
    PASSENGER_NATIONALITY: 'Indonesia',
    PASSPORT_NUMBER: '09876543',
    PASSPORT_COUNTRY: 'Indonesia',
    PASSPORT_EXPIRY_DATE: '28',
    PASSPORT_EXPIRY_MONTH: 'December',
    PASSPORT_EXPIRY_YEAR: '2030'
  }
})