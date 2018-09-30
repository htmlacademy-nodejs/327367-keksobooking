'use strict';
const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `печатает автора приложения`,
  execute() {
    console.log(`v${packageInfo.author}`);
  }
};
