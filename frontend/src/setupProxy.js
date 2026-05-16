const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding to backend
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.method, req.url, 'to http://localhost:8080' + req.url.replace('/api', ''));
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      }
    })
  );
};
