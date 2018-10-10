'use strict';
const packageInfo = require(`../../package.json`);
const generateEntity = require(`../generateEntity.js`);
module.exports = {
  name: `--genentity`,
  description: `Генерирует данные`,
  execute() {
    return generateEntity();
  }
};
