'use strict';
const packageInfo = require(`../../package.json`);
const colors = require(`colors`);

module.exports = {
  name: `--version`,
  description: `печатает версию приложения`,
  execute() {
    let VersionArray = packageInfo.version.split(`.`);
    let message = `v` + colors.red(VersionArray[0]) + `.` + colors.green(VersionArray[1]) + `.` + colors.blue(VersionArray[2]);
    console.log(message);
  }
};
