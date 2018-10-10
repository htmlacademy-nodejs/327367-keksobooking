'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stout,
  prompt: `Привет таинственный незнакомец, давай сгенерируем данные? `
});
rl.prompt();
const packges = [
  require(`./src/commands/license.js`),
  require(`./src/commands/version.js`),
  require(`./src/commands/description.js`),
  require(`./src/commands/help.js`),
  require(`./src/commands/genentitycommand.js`),
  require(`./src/commands/author.js`)
];
const generateEntityCommand = require(`./src/commands/genentitycommand.js`);

let UserCommand = process.argv[2]; //  команда вводимая пользователем

let commandArray = packges.filter(function (item) {
  return item.name === UserCommand;
});
function getItems (countItem){
  const generateEntity = require(`./src/generateEntity.js`);
  let DataList = [];
  for (let i = 0; i < countItem; i++){
    DataList.push(generateEntity());
  }
  return JSON.stringify(DataList);
}
if (commandArray.length > 0) {
  commandArray[0].execute();
} else {
  let message = ``;
  packges.forEach(function (item) {
    message += item.name + ` — ` + item.description + `\n`;
  });
  if (UserCommand === undefined) {
    rl.prompt();
    console.log(`Привет таинственный незнакомец, давай сгенерируем данные?(да/нет)`);
    rl.on(`line`, (line) => {
      line = line.trim();
      switch (line) {
        case`да`:
          console.log(`Сколько нужно экземпляров?`);
          rl.question('Сколько', (CountItem) => {
            //хочу тут повторить вопрос, но выбрасывает на 45 строку
            if(parseInt(CountItem) < 1 || isNaN(parseInt(CountItem))){
              console.log(`Это точно не число, давай еще раз`);
            } else{
              console.log(`${CountItem}, Ок. Укажи путь до файла, в который записать данные, например: ${__filename}`);
              rl.question('Адрес', (address) => {
                fs.exists(address, (exists) => {
                  if (exists) {
                    console.log(`Файл по этому адресу существует, перезаписать?(да/нет)`);
                    rl.question('Подтвержденеи', (replyAnswer) => {
                      if(replyAnswer === `да`){
                        fs.writeFile(address, getItems(parseInt(CountItem)), function(error){
                          if(error) console.log(error); // если возникла ошибка
                          console.log("Асинхронная запись файла завершена. Содержимое файла:");
                        });
                      }
                      rl.close();
                    });
                  } else {
                    fs.writeFile(address, getItems(parseInt(CountItem)), function(error){
                      if(error) console.log(error); // если возникла ошибка
                      console.log("Асинхронная запись файла завершена. Содержимое файла:");
                    });
                  }
                });
                // console.log(`Хмм, ну ок ${answer}`);
                // rl.close();
              });
            }
          });
          break;
        case `нет`:
          rl.close();
          return;
        default:
          console.log(`Что ты сказал? Мне трудно понять '${line}'`);
          break;
      }
      rl.prompt();
    }).on(`close`, () => {
      console.log(`Хорошего дня!`);
      process.exit(0);
    }).on(`error`, (err) => {
      console.log(err);
      process.exit(1);
    })
    // message = `Привет таинственный незнакомец, давай сгенерируем данные. Введи команду: ` + generateEntityCommand.name;
    // console.log(message);
  } else {
    message = `Неизвестная команда: ` + UserCommand +
      `.\n` + message;
    console.error(message, 1);
  }
}
