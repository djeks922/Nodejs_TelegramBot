import {Scenes} from 'telegraf'
import {backToRegistryButtons} from '../markup.js'

const {BaseScene} = Scenes


export const requirementScene = new BaseScene('influencer-scene-requirement-id')

requirementScene.enter(async(ctx) => {
    await ctx.reply('Enter your requirement' ,backToRegistryButtons())
})
requirementScene.leave(async (ctx) => {
    // await ctx.scene.enter('influencer-scene-id')
})

requirementScene.hears('Back to registry', async (ctx) => {
    await ctx.scene.enter('influencer-scene-id')
    // await ctx.deleteMessage()
    // await ctx.deleteMessage(ctx.message.message_id - 1)
})

requirementScene.on('text', async (ctx) => {
    ctx.session.influencer.requirement = ctx.message.text
    await ctx.reply('Requirement saved!')
    await ctx.scene.enter('influencer-scene-id')
})
requirementScene.on('message', async (ctx) => {
    await ctx.reply('No such option')
})

requirementScene.on('callback_query', async (ctx) => {
    await ctx.answerCbQuery('')
})

export default requirementScene