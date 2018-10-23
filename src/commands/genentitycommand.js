'use strict';
const generateEntity = require(`../generateEntity.js`);
module.exports = {
  name: `--genentity`,
  description: `Генерирует данные`,
  execute() {
    return generateEntity();
  }
};
