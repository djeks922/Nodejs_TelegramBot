import { Scenes } from "telegraf";

const {WizardScene} =  Scenes



const consumerScene = new WizardScene('cid', 
    async (ctx) => {
        console.log(ctx.message.text)
        await ctx.reply('Enter your token website')
        ctx.wizard.state.name = ctx.message.text
        ctx.wizard.next()
    },
    async (ctx) => {
        console.log(ctx.message.text)
        await ctx.reply('Keep going...')
        await ctx.reply('Enter token Contract Address')
        ctx.wizard.state.url = ctx.message.text
        ctx.wizard.next()
    },
    async (ctx) => {
        await ctx.replyWithHTML(`<strong><i>${ctx.wizard.state.name}</i> is your Token name\n<a>${ctx.wizard.state.url}</a> is your Token website\n<i>${ctx.message.text}</i> is your Contract Address</strong>`, {disable_web_page_preview: true})
        await ctx.reply('Thanks for coorparation!')
        await ctx.scene.leave()
    }
)


consumerScene.enter(async(ctx) => {
    await ctx.reply(`Hi again, ${ctx.message.from.first_name}`)
    await ctx.reply(`Please enter your token name`)
    
})


export default consumerScene