'use strict';
const assert = require(`assert`);
const generateEntity = require(`../src/generateEntity`);
const titles = [`Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const types = [`flat`, `palace`, `house`, `bungalo`];
const checkinOut = [`12:00`, `13:00`, `14:00`];

function find(array, value) {
  if (array.indexOf) { // если метод существует
    return array.indexOf(value);
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

describe(`generateEntity`, () => {
  let keksBookingObj = generateEntity();
  it(`Проверяет аватар пользователя`, () => {
    let result = (keksBookingObj.author.avatar.indexOf(`https://`) !== -1);
    assert.equal(result, true);
  });
  it(`Проверяет количество комнат`, () => {
    let rooms = keksBookingObj.offer.rooms;
    let result = (rooms > 0 && rooms <= 5 && rooms !== `undefined`);
    assert.equal(result, true);
  });
  it(`Проверяет коммерческого предложения`, () => {
    let titleOffer = keksBookingObj.offer.title;
    let result = (find(titles, titleOffer) !== -1);
    assert.equal(result, true);
  });
  it(`Проверяет адрес`, () => {
    let adressOffer = keksBookingObj.offer.adress;
    let result = (typeof adressOffer === `string`);
    assert.equal(result, true);
  });
  it(`Проверяет цены`, () => {
    let priceOffer = keksBookingObj.offer.price;
    let result = (priceOffer >= 1000 && priceOffer <= 1000000);
    assert.equal(result, true);
  });
  it(`Проверяет тип `, () => {
    let typeOffer = keksBookingObj.offer.type;
    let result = (find(types, typeOffer) !== -1 && typeof typeOffer === `string`);
    assert.equal(result, true);
  });
  it(`Проверяет количество комнат`, () => {
    let roomsOffer = keksBookingObj.offer.rooms;
    let result = (roomsOffer > 0 && roomsOffer <= 5 && typeof roomsOffer === `number`);
    assert.equal(result, true);
  });
  it(`Проверяет количество гостей`, () => {
    let guestsOffer = keksBookingObj.offer.guests;
    let result = (guestsOffer > 0 && typeof guestsOffer === `number`);
    assert.equal(result, true);
  });
  it(`Проверяет время заселения`, () => {
    let checkinOffer = keksBookingObj.offer.checkin;
    let result = (find(checkinOut, checkinOffer) !== -1 && typeof checkinOffer === `string`);
    assert.equal(result, true);
  });
  it(`Проверяет время выезда`, () => {
    let checkOutOffer = keksBookingObj.offer.checkout;
    let result = (find(checkinOut, checkOutOffer) !== -1 && typeof checkOutOffer === `string`);
    assert.equal(result, true);
  });
  it(`Проверяет услуги отеля`, () => {
    let featuresOffer = keksBookingObj.offer.features;
    let result = (typeof featuresOffer === `object` && featuresOffer.length === 3);
    assert.equal(result, true);
  });
  it(`Проверяет описание`, () => {
    let descriptionOffer = keksBookingObj.offer.description;
    let result = (descriptionOffer === ``);
    assert.equal(result, true);
  });
  it(`Проверяет фото`, () => {
    let photosOffer = keksBookingObj.offer.photos;
    let result = (typeof photosOffer === `object` && photosOffer.length === 3);
    assert.equal(result, true);
  });
  it(`Проверяет дату`, () => {
    let dateItem = keksBookingObj.date;
    let result = (dateItem > Date.now() - 604800 && dateItem < Date.now());
    assert.equal(result, true);
  });
});
