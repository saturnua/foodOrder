const { Scenes } = require('telegraf');

const first = new Scenes.BaseScene('first');

first.enter(async ctx => {
        await ctx.reply('Этап 1: выбор типа матча.');
        return ctx.next(); // Переходим к следующему обработчику.
    },
    // (ctx) => {
    //     ctx.reply('Этап 2: выбор времени проведения матча.');
    //     return ctx.wizard.next(); // Переходим к следующему обработчику.
    // },
    // (ctx) => {
    //     if (ctx.message.text === "Назад") {
    //         ctx.wizard.back(); // Вернуться к предыдущиму обработчику
    //     }
    //     ctx.reply('Этап 3: выбор места проведения матча.');
    //     return ctx.wizard.next(); // Переходим к следующему обработчику.
    // },
    //
    // // ...
    //
    async ctx => {
        await ctx.reply('Финальный этап: создание матча.');
        return ctx.scene.leave();
    }
);

module.exports = first;