require('newrelic');
require('dotenv').config();
const express = require('express');
const {
  Telegraf,
  session,
  Scenes: { WizardScene, Stage },
} = require('telegraf');

const { isEmptyObject } = require('mongoose/lib/utils');
const { getMainMenu, makeOrderKeyboard, numericKeyboard } = require('./keyboard');
const token = process.env.BOT_TOKEN;
const { setOrder, getMyOffers } = require('./controllers/orderController');
const Product = require('./models/productModel');

const { getProduct } = require('./controllers/productController');

const app = express();

if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const productHandler = Telegraf.on('text', async (ctx) => {
  const product = await Product.findOne({ name: `${ctx.message.text}` });
  if (isEmptyObject(ctx.scene.state)) {
    ctx.scene.state = { products: [] };
  }
  ctx.session.product = {};
  ctx.session.product = { product: product.id };
  ctx.reply(`Вы выбрали ${product.name} - введите пожалуста количество: `, numericKeyboard());

  return ctx.wizard.next();
});

const quantityConfirmHandler = Telegraf.on('text', async (ctx) => {
  if (Number.isNaN(ctx.message.text)) {
    ctx.reply('Пожалуйста введите число');

    return ctx.scene.reenter();
  }
  ctx.scene.state.products.push({ ...ctx.session.product, ...{ quantity: ctx.message.text } });

  let orderString = '';
  for (const product of ctx.scene.state.products) {
    const prod = await getProduct(product.product);
    orderString = orderString.concat(`<i>${prod.name}:  ${product.quantity} шт</i> \n`);
  }
  await ctx.replyWithHTML(`Ваш заказ \n\n` + `${orderString}`, makeOrderKeyboard());

  return ctx.wizard.next();
});

const quantityHandler = Telegraf.action(['add', 'make'], async (ctx) => {
  ctx.scene.state.tgUserID = ctx.update.callback_query.from.id;

  if (ctx.callbackQuery.data === 'make') {
    await setOrder(ctx.scene.state);
    ctx.editMessageText('Ваша заказ успешно добавлен');
  } else {
    await ctx.scene.reenter();
  }

  await ctx.scene.reenter();
});

const choseFoodScene = new WizardScene(
  'chooseFoodScene',
  productHandler,
  quantityConfirmHandler,
  quantityHandler,
);
choseFoodScene.enter((ctx) =>
  ctx.reply('Для того чтобы сделать заказ выберите продукт', getMainMenu()),
);

const bot = new Telegraf(token);

//bot.use(Telegraf.log())

bot.hears('📦 Мои заказы 📦', async (ctx) => {
  const offers = await getMyOffers(ctx.message.from.id);
  let products = [];
  offers.forEach((offer, index) => {
    products.push(`------- Order # ${index + 1} ----------\n`);
    offer.products.forEach((prod) => {
      products.push(`${prod.product.name}  - ${prod.quantity} шт \n`);
    });
  });
  await ctx.replyWithHTML('<b>Список ваших заказов:</b>\n\n' + products);
});
stage = new Stage([choseFoodScene]);
bot.use(session());
bot.use(stage.middleware());
bot.command('/start', (ctx) => ctx.scene.enter('chooseFoodScene'));
bot.launch();

module.exports = app;
