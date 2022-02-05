const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/v2/apex/standard/profile/psn/oNqNu',
    createProxyMiddleware({
      target: 'https://public-api.tracker.gg',
      changeOrigin: true,
    })
  )
}
