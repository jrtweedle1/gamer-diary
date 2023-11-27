const { override } = require('customize-cra');

module.exports = override(
    (config) => {
        if (config.devServer) {
            config.devServer.disableHostCheck = true; // Disables host check
            config.devServer.allowedHosts(['localhost', '127.0.0.1']);
        }
        return config;
    }
);