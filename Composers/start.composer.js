import {Composer ,Telegram} from 'telegraf'

const composer = new Composer()

composer.start((ctx) => {
    ctx.reply(`Hello, ${ctx.message.from.first_name}`)
    ctx.user.push({
        username: ctx.message.from.first_name,
        userId: ctx.message.from.id,
        chatId: ctx.chat.id
    })
})

composer.help((ctx) => {
    ctx.replyWithHTML(
        `<strong>/start - initialize bot</strong>\n<strong>/help - get information about commands</strong>`
        )
    ctx.tg.sendMessage(ctx.user[0].chatId,`User ${ctx.message.from.first_name} pressed /help`)  
})

export default composer