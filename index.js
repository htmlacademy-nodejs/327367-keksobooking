'use strict';

const generate = require(`./src/generate.js`);
const packges = [
  require(`./src/commands/license.js`),
  require(`./src/commands/version.js`),
  require(`./src/commands/description.js`),
  require(`./src/commands/help.js`),
  require(`./src/commands/genentitycommand.js`),
  require(`./src/commands/author.js`)
];

let UserCommand = process.argv[2]; //  команда вводимая пользователем

let commandArray = packges.filter(function (item) {
  return item.name === UserCommand;
});

if (commandArray.length > 0) {
  commandArray[0].execute();
  process.exit(1);
} else {
  let message = ``;
  packges.forEach(function (item) {
    message += item.name + ` — ` + item.description + `\n`;
  });
  if (UserCommand === undefined) {
    generate.execute()
      .catch((error) => {
        console.log(`Error`, error);
        process.exit(1);
      });
  } else {
    message = `Неизвестная команда: ` + UserCommand +
      `.\n` + message;
    console.error(message, 1);
  }
}
