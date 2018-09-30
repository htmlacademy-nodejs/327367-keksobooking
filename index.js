'use strict';
let error = false; //  код ошибки
let message = ``; // сообщение вывода
let UserCommand = process.argv[2]; //  команда вводимая пользователем
let ProjectName = `Кексобукинг`; //  название проекта
let ProjectAuthor = `Степанов Павел`; //  автор проекта

switch (UserCommand) {
  case `--version`:
    message = `v0.0.1`;
    break;
  case `--help`:
    message = `Доступные команды:\n` +
      `--help    — печатает этот текст;\n` +
      `--version — печатает версию приложения;`;
    break;
  case undefined:
    message = `Привет пользователь!\n` +
      `Эта программа будет запускать сервер «` + ProjectName + `».\n` +
      `Автор:` + ProjectAuthor + `.`;
    break;
  default:
    message = `Неизвестная команда {{ ` + UserCommand + ` }}.\n` +
      `Чтобы прочитать правила использования приложения, наберите "--help"`;
    error = 1;
}

if (error) {
  console.error(message, error);
} else {
  console.log(message);
}
