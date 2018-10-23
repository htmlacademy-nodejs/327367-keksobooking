'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const { promisify } = require(`util`);

const generateEntity = require(`./generateEntity.js`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

const ask = prompt => new Promise(resolve => {
  rl.question(prompt, resolve);
});
const greetingQuestion = async () => {
  let answer;
  do {
    answer = await ask(`Привет таинственный незнакомец, давай сгенерируем данные? (y/n) \n`);
  } while (![`y`,`n`].includes(answer));

  if (answer !== `y`) {
    throw `Пользователь отказался генерировать данные`;
  }
};

const quantityQuestion = async (question = `Сколько элементов требуется сгенерировать? \n`) => {
  const quantity = await ask(question);
  if (isNaN(Number(quantity))) {
    return quantityQuestion(`Это точно не число, давай попробуем еще раз: \n`);
  }
  return quantity;
};

const checkPathIsFree = path => access(path).then(() => false, () => true);

const pathQuestion = async quantity => {
  const answer = await ask(`Введите путь до файла, в котором требуется сохранить данные \n`);
  const fullPath = `${process.cwd()}/${answer}`;
  return checkPathIsFree(fullPath).then((pathIsFree) => ({fullPath, pathIsFree, quantity}));
};

const rewriteQuestion = async params => {
  const answer = await ask(`Такой файл уже существует, перезаписать? (y/n) \n`);
  if (answer !== `y`) {
    throw `Пользователь отказался перезаписывать файл`;
  }
  return params;
};

const saveFile = (path, quantity) => {
  const entities = [];
  for (let i = 0; i < quantity; i++) {
    entities.push(generateEntity());
  }
  return writeFile(path, JSON.stringify(entities), fileWriteOptions);
};

module.exports = {
  name: `generate`,
  description: `генерирует новую сущность и записывает в файл`,
  execute() {
    return greetingQuestion()
      .then(quantityQuestion)
      .then(pathQuestion)
      .then(params => (params.pathIsFree ? params : rewriteQuestion(params)))
      .then(({fullPath, quantity}) => saveFile(fullPath, quantity))
      .then(() => console.log(`Файл успешно создан!`))
      .then(() => rl.close());
  }
};
