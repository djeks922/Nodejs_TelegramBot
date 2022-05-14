import {Composer ,Telegram} from 'telegraf'

const composer = new Composer()

composer.start((ctx,next) => {
    ctx.reply(`Hello, ${ctx.message.from.first_name}`)
    ctx.forwardMessage(ctx.chat.id, {disable_notification: false})
    ctx.reply(`How could we /help you ?`)
})

composer.help((ctx) => {
    ctx.reply(
        `/start - initialize bot\n/help - get information about commands`
        )
})

export default composer