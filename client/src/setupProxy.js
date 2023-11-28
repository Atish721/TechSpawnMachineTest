const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/server/controller/authController',
    createProxyMiddleware({
      target: 'https://atish-backend.byethost7.com',
      secure:false,
      changeOrigin: true,
    })
  );
};