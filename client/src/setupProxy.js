const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // Specify your backend API route here
        createProxyMiddleware({
            target: 'http://localhost:8080', // Your backend server address
            changeOrigin: true,
        })
    );
};