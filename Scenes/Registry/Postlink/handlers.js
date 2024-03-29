import { Markup } from "telegraf"

export const enter = async (ctx) => {
    try {
        // console.log(ctx.scene.state)
        await ctx.reply('Please enter post links',Markup.keyboard([['done']]).oneTime().resize())
        ctx.scene.state.links = []
        await ctx.answerCbQuery()
    } catch (error) {
        throw error
    }
}
export const leave = async (ctx) => {
    try {
        consolee.log('post scene leaved')
    } catch (error) {
        throw error
    }
}
export const onMessage = async (ctx) => {
    try {
        return await ctx.reply('Not valid Link')
    } catch (error) {
        throw error
    }
}
export const onText = async (ctx) => {
    try {
        ctx.scene.state.links.push(ctx.message.text)
        // console.log(ctx.scene.state.links)
        await ctx.reply('Add more')
    } catch (error) {
        throw error
    }
}
export const onCallbackQr = async (ctx) => {
    try {
        await ctx.answerCbQuery()
    } catch (error) {
        throw error
    }
}

export const done = async (ctx) => {
    try {
        const proposal = await ctx.scene.state.proposal
        await proposal.populate('consumer')
        
        let text = `Your post links 
from influencer: ${ctx.session.influencer.name}
for token: ${proposal.name}\n\n`
        for(let link of ctx.scene.state.links){
            text += `${link}\n`
        }

        await ctx.telegram.sendMessage(proposal.consumer.chatID,text)
        await ctx.reply('Successfully send to consumer!')
        return
    } catch (error) {
        throw error
    }
}