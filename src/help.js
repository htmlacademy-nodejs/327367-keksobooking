'use strict';

module.exports = {
  name: `help`,
  description: `печатает список доступных команд`,
  execute() {
    let message = `Доступные команды:\n` +
      `--help    — печатает этот текст;\n` +
      `--author    — печатает автора приложения;\n` +
      `--description    — печатает описание приложения;\n` +
      `--license    — печатает лицензию приложения;\n` +
      `--version — печатает версию приложения;`;
    console.log(message);
  }
};
