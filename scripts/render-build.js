
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const configFactory = require('../config/webpack.render');

const config = configFactory(process.env.NODE_ENV);
const compiler = webpack(config);
const spinner = ora('React webpack ...');
const TAG = '[scripts/render-build.js]';

compiler.hooks.beforeCompile.tap('start', () => spinner.start());

compiler.run(compileHandle);

function compileHandle(err, stats) {
  // console.log(stats.compilation.records);
  spinner.stop();

  if (err) {
    console.log(TAG, chalk.red('💥 webpack @kmoz'));
  } else if (stats.hasErrors()) {
    // webpack 
    const json = stats.toJson('errors-only');
    // fs.writeFileSync(path.join(__dirname, './\.tmp/errors.json'), JSON.stringify(json, null, 2));
    console.log(TAG, filterLogs(json.errors)().join('\n'));
    console.log(TAG, chalk.red('💥 DONE'));
  } else {
    console.log(TAG, chalk.green('React webpack DONE'));
  }
}

/**
 * webpack 
 */
function filterLogs(errors) {
  let tmp = [];
  return function (filter = true) {
    if (filter) {
      errors.forEach(err => {
        if (err.includes('Error: Child compilation failed:')) {
          return;
        }
        if (!tmp.find(_ => _.split('\n')[1] === err.split('\n')[1])) {

          tmp.push(err);
        }
      });
    } else {
      tmp = errors;
    }
    return tmp;
  }
}
