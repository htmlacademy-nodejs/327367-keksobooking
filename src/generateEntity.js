'use strict';

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = function generateEntity() {
  const Entity = {};
  const Offer = {};
  const titles = [`Большая уютная квартира`,
    `Маленькая неуютная квартира`,
    `Огромный прекрасный дворец`,
    `Маленький ужасный дворец`,
    `Красивый гостевой домик`,
    `Некрасивый негостеприимный домик`,
    `Уютное бунгало далеко от моря`,
    `Неуютное бунгало по колено в воде`
  ];
  const checkinOut = [`12:00`, `13:00`, `14:00`];
  const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const types = [`flat`, `palace`, `house`, `bungalo`];
  const photos = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const DateUF = randomInteger(Date.now() - 604800, Date.now());
  const Author = {
    avatar: `https://robohash.org/` + randomInteger(100, 100000)
  };
  const Location = {
    x: randomInteger(300, 900),
    y: randomInteger(150, 500)
  };
  for (let i = 0; i < 3; i++) {
    features.splice(randomInteger(0, features.length - 1), 1);
  }

  Offer.title = titles[randomInteger(0, titles.length - 1)];
  Offer.adress = Location.x + `, ` + Location.y;
  Offer.price = randomInteger(1000, 1000000);
  Offer.rooms = randomInteger(1, 5);
  Offer.type = types[randomInteger(0, types.length - 1)];
  Offer.guests = randomInteger(1, 1000);
  Offer.checkin = checkinOut[randomInteger(0, checkinOut.length - 1)];
  Offer.checkout = checkinOut[randomInteger(0, checkinOut.length - 1)];
  Offer.features = features;
  Offer.description = ``;
  Offer.photos = shuffle(photos);

  Entity.author = Author;
  Entity.offer = Offer;
  Entity.location = Location;
  Entity.date = DateUF;
  return Entity;
};
