'use strict'
const target = process.env.npm_lifecycle_event
  if (target === 'test') {
    var configObj = {
      NODE_ENV: '"production"',
      API_ROOT: '""',
      API_DOWNLOAD: '"http://test.weupay.com:8080"'
      }
  } else if (target === 'build') {
    var configObj = {
      NODE_ENV: '"production"',
      API_ROOT: '""',
      API_DOWNLOAD: '"http://download.weupay.com"'
    }
  }
  module.exports = configObj
