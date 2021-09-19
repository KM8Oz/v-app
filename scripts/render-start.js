
process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
require('dotenv').config();
const configFactory = require('../config/webpack.render');

const config = configFactory(process.env.NODE_ENV);
const serverConfig = config.devServer || {};
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, serverConfig);
const port = process.env.PORT || 4000;

server.listen(port, serverConfig.host || '0.0.0.0', err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.green(`APP IS LIVE AT http://localhost:${port}`));
});

// ctrl+c、kill 命令
['SIGINT', 'SIGTERM'].forEach(function (sig) {
  process.on(sig, function () {
    server.close();
    process.exit();
  });
});
