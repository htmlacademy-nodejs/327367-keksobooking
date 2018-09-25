var error = false; //код ошибки
var message = ''; //сообщение вывода
var userCommand = process.argv[2]; //команда вводимая пользователем
var projectName = 'Кексобукинг'; //название проекта
var projectAuthor = 'Степанов Павел'; //автор проекта

switch (userCommand) {
  case '--version':
    message = 'v0.0.1';
    break;
  case '--help':
    message = 'Доступные команды:\n' +
      '--help    — печатает этот текст;\n' +
      '--version — печатает версию приложения;';
    break;
  case undefined:
    message = 'Привет пользователь!\n' +
      'Эта программа будет запускать сервер «' + projectName + '».\n' +
      'Автор:' + projectAuthor + '.';
    break;
  default:
    message = 'Неизвестная команда {{ ' + userCommand + ' }}.\n' +
      'Чтобы прочитать правила использования приложения, наберите "--help"';
    error = 1;
}

if (error) console.error(message, error);
else console.log(message);
