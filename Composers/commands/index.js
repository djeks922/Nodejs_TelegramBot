import {Composer} from 'telegraf'

const composer = new Composer()

// Add command
composer.command('add', (ctx)=> {
    ctx.scene.enter('consumer-scene-id')
})
composer.command('register', (ctx) => {
    // ctx.scene.enter('influencer-scene-id')
})
// composer.command('info', (ctx) => {
//     ctx.reply(`your token details: ${JSON.stringify(ctx.session?.tokenDetails)}`)
// })


export default composer