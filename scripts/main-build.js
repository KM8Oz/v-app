
const chokidar = require('chokidar');
const wait_on = require('wait-on');
const server = require('electron-connect').server;
require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const configFactory = require('../config/webpack.main');

const TAG = 'scripts/main-pack.js';
const electron = server.create({
  // port: 9944, //  30080
  stopOnClose: true, //  electron 
});
const spinner = ora('Electron webpack build...');
const compiler = webpack(configFactory(argv.env));
let watching = null;

compiler.hooks.afterCompile.tap('electron compiled', () => {
  spinner.stop();
  if (argv.watch) { 
    // init--、restarted-
    const state = electron.electronState;
    'init' === state ? electron.start() : electron.restart();
  }
});

compiler.hooks.beforeCompile.tap('electron start compile', () => {
  spinner.start();
});

function compile_handle(err, stats) {
  if (err) {
    // err 
    console.log(TAG, chalk.red('💥 Electron webpack 相关报错'));
    console.log(err);

    //  wepback 
    watching && watching.close(() => console.log(TAG, 'Watching Ended.'));
    process.exit(1);
  } else if (stats.hasErrors()) {
    // webpack 
    const json = stats.toJson('errors-only');
    console.log(TAG, json.errors.join('\n'));
    console.log(TAG, chalk.red('💥 Electron @KMOZ'));
  } else {
    console.log(TAG, chalk.green('Electron webpack @KMOZ'));
  }
}

if (argv.watch) { 
  const opts = {
    resources: [`http://localhost:${argv.port || process.env.PORT}`], // dotenv[PORT === port]
    interval: 900, // poll interval in ms, default 250ms
    log: false,
    verbose: false,
  };

  //  webpack-dev-server  electron
  wait_on(opts, function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // once here, all resources are available
    watching = compiler.watch({
      ignored: /bundle\.js(\.map)?/,
    }, compile_handle);
  });
} else { 
  compiler.run(compile_handle);
}
