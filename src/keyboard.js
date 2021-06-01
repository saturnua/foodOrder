const { Markup } = require('telegraf');

function getMainMenu() {
  return Markup.keyboard([
    ['🐟 Рыба 1', '🐠 Рыба 2'], // Row1 with 2 buttons
    ['🍖 Мясо 1', '🥩 Мясо 2'], // Row2 with 2 buttons
    ['📦 Мои заказы 📦'], // Row3 with 3 buttons
  ])
    .oneTime()
    .resize();
}

function yesNoKeyboard() {
  return Markup.inlineKeyboard(
    [Markup.button.callback('Да', 'yes'), Markup.button.callback('Нет', 'no')],
    { columns: 2 },
  );
}

function makeOrderKeyboard() {
  return Markup.inlineKeyboard(
    [
      Markup.button.callback('Добавить что-то еще', 'add'),
      Markup.button.callback('Оформить заказ', 'make'),
    ],
    { columns: 2 },
  );
}

function numericKeyboard() {
  return Markup.keyboard([
    ['1', '2', '3'],
    ['4', '5', '6'],
  ])
    .oneTime()
    .resize();
}
module.exports = { getMainMenu, yesNoKeyboard, makeOrderKeyboard, numericKeyboard };
