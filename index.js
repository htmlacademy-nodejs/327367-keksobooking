'use strict';
const packges = [
  require(`./src/license.js`),
  require(`./src/version.js`),
  require(`./src/description.js`),
  require(`./src/help.js`),
  require(`./src/author.js`)
];

let UserCommand = process.argv[2]; //  команда вводимая пользователем

let commandArray = packges.filter(function (item) {
  return item.name === UserCommand;
});
if (commandArray.length > 0) {
  commandArray[0].execute();
} else {
  let message = `Неизвестная команда: ` + UserCommand + `.\n`;
  packges.forEach(function (item) {
    message += item.name + ` — ` + item.description + `\n`;
  });
  console.error(message, 1);
}
