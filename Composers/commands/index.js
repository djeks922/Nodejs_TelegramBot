import {Composer} from 'telegraf'

const composer = new Composer()

// Add command
composer.command('add', (ctx)=> {
    ctx.scene.enter('cid')
})
composer.command('info', (ctx) => {
    ctx.reply(`your token details: ${JSON.stringify(ctx.session?.tokenDetails)}`)
})


export default composer