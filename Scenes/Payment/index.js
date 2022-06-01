import { Scenes } from "telegraf";
import {getAdmins} from '../../api/service/consumer.js'
import {consumerPaymentText} from '../../helpers/consumer.js'

const { BaseScene } = Scenes


const paymentScene = new BaseScene('payment-scene-id')

paymentScene.enter(async( ctx) => {
    await ctx.reply('Please enter TaxID of transaction for related package')
    console.log(ctx.scene.state)
    const proposal = ctx.session.proposals.find(p => `${p._id}` === ctx.scene.state.proposalID)
    ctx.scene.state.proposal = proposal
    proposal.packages.forEach(pkg => `${pkg._id}` === ctx.scene.state.pkgID ? ctx.scene.state.pkg = pkg : '')
    // console.log(ctx.scene.state.pkg)
})

paymentScene.on('text', async(ctx) => {
    try {
        console.log(ctx.scene.state)
        const admin = await getAdmins()
        const {proposal,pkg} = ctx.scene.state
        ctx.telegram.sendMessage(admin.chatID, consumerPaymentText(ctx,proposal,pkg))
        return 
    } catch (error) {
        throw error
    }
})
paymentScene.on('message', async(ctx) => {
    try {
        await ctx.reply('Please enter valid TaxID')
    } catch (error) {
        throw error
    }
})

export default paymentScene