'use strict';
const colors = require(`colors`);

module.exports = {
  name: `--help`,
  description: `печатает список доступных команд`,
  execute() {
    let message = `Доступные команды:\n` +
      colors.grey(`--help `) + ` — ` + colors.green(`печатает этот текст;`) + `\n` +
      colors.grey(`--author`) + ` — ` + colors.green(`печатает автора приложения;`) + `\n` +
      colors.grey(`--description`) + ` — ` + colors.green(`печатает описание приложения;`) + `\n` +
      colors.grey(`--license`) + ` — ` + colors.green(`печатает лицензию приложения;`) + `\n` +
      colors.grey(`--version`) + ` — ` + colors.green(`печатает версию приложения;`);
    console.log(message);
  }
};
