'use strict';
module.exports = {
  name: `help`,
  description: `Печатает список доступных команд`,
  execute() {
    let message = `Доступные команды:\n` +
      `--help    — печатает этот текст;\n` +
      `--version — печатает версию приложения;`;
    console.log(message);
  }
};
