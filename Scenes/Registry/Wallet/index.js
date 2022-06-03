import {Markup, Scenes} from 'telegraf'
import {backToRegistryButtons} from '../markup.js'

const {BaseScene} = Scenes


export const walletScene = new BaseScene('influencer-scene-wallet-id')

walletScene.enter(async(ctx) => {
    await ctx.reply('Enter your wallet address',backToRegistryButtons())
})
walletScene.leave(async (ctx) => {
    // await ctx.scene.enter('influencer-scene-id')
})

walletScene.hears('Back to registry', async (ctx) => {
    await ctx.scene.enter('influencer-scene-id')
    // await ctx.deleteMessage()
    // await ctx.deleteMessage(ctx.message.message_id - 1)
})

walletScene.on('text', async (ctx) => {
    ctx.session.influencer.wallet = ctx.message.text
    await ctx.reply('Wallet saved!', Markup.removeKeyboard())
    await ctx.scene.enter('influencer-scene-id')
})
walletScene.on('message', async (ctx) => {
    await ctx.reply('no such option')
})

export default walletScene