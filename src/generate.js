'use strict';
const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const {generateEntity} = require(`./generateEntity.js`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `Привет таинственный незнакомец, давай сгенерируем данные? `
});

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

const ask = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

const greetingQuestion = () => ask(`Привет таинственный незнакомец, давай сгенерируем данные? (y/n) \n`).then((answer) => {
  if (answer !== `y`) {
    return Promise.reject(`Пользователь отказался генерировать данные`);
  }
  return Promise.resolve();
});

const quantityQuestion = (question = `Сколько элементов требуется сгенерировать? \n`) => ask(question).then((quantity) => {
  if (isNaN(Number(quantity))) {
    return quantityQuestion(`Это точно не число, давай попробуем еще раз: \n`);
  }
  return Promise.resolve(quantity);
});

const checkPathIsFree = (path) => access(path).then(() => false, () => true);

const pathQuestion = (quantity) => ask(`Введите путь до файла, в котором требуется сохранить данные \n`).then((path) => {
  const fullPath = `${process.cwd()}/${path}`;
  return checkPathIsFree(fullPath).then((pathIsFree) => ({fullPath, pathIsFree, quantity}));
});

const rewriteQuestion = (params) => ask(`Такой файл уже существует, перезаписать? (y/n) \n`).then((answer) => {
  if (answer !== `y`) {
    return Promise.reject(`Пользователь отказался перезаписывать файл`);
  }
  return params;
});

const saveFile = (path, quantity) => {
  const entities = [];
  for (let i = 0; i < quantity; i++) {
    entities.push(generateEntity());
  }
  return writeFile(path, JSON.stringify(entities), fileWriteOptions).then((err) => {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  });
};

module.exports = {
  name: `generate`,
  description: `генерирует новую сущность и записывает в файл`,
  execute() {
    return greetingQuestion()
      .then(quantityQuestion)
      .then(pathQuestion)
      .then((params) => params.pathIsFree ? params : rewriteQuestion(params))
      .then(({fullPath, quantity}) => saveFile(fullPath, quantity))
      .then(() => console.log(`Файл успешно создан!`))
      .then(() => rl.close());
  }
};
