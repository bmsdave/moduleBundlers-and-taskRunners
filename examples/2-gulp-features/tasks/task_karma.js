const Server = require('karma').Server;
const path = require('path');

module.exports = function (gulp, plugins, conf) {
    return () => {
        const server = new Server(
            {
                configFile: conf.karma,
                singleRun: true
            }
        );
        server.start();
    }
};
