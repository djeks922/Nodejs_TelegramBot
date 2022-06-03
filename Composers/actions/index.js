import {Composer} from 'telegraf'
import {getProposalByID} from '../../api/service/proposal.js'
import {getTransactionByID} from '../../api/service/transaction.js'
import {updateProposal} from '../../api/utils/proposal/markup.js'
import { approveProposal , rejectProposal ,approveIndividual, activateInfluencer,rejectActivationInfluencer} from './admin.js'
import { acceptInfluencer,updateProfile } from './influencer.js'
import { updateProposals } from './customer.js'
import {consumerTransactionNText} from '../../helpers/consumer.js'
import { getConsumerByID } from '../../api/service/consumer.js'

const composer = new Composer()

// Add actions


composer.action('updateProfile', updateProfile)
composer.action('updateProposal', updateProposals)
composer.action(/admin-activated-influencer+/, activateInfluencer)
composer.action(/admin-rejectedActivation-influencer+/, rejectActivationInfluencer)

composer.action(/oo+/, async(ctx) => {
    const proposalID = ctx.callbackQuery.data.split(' ')[1]
    const pkgID = ctx.callbackQuery.data.split(' ')[2]
    // console.log(ctx)
    await ctx.scene.enter('payment-scene-toAdmin-id',{proposalID,pkgID})
    await ctx.answerCbQuery()
})
composer.action(/infvt+/, async(ctx) => {
    const trId = ctx.callbackQuery.data.split(' ')[1]
    const transaction = await getTransactionByID(trId)
    const admin = await getConsumerByID(transaction.proposal.approvedBy)

    await ctx.telegram.sendMessage(transaction.from.chatID, 'Deal done!')
    await ctx.telegram.sendMessage(admin.chatID, 'Influencer verified transaction')
    await ctx.answerCbQuery()
})
composer.action(/adminvt+/, async (ctx) => {
    try {
        const trID = ctx.callbackQuery.data.split(' ')[1]

        const transaction = await getTransactionByID(trID)
        const proposal = await getProposalByID(transaction.proposal._id, {lean:false, populate:true})

        let index = proposal.packages.findIndex(e => e.influencer._id.toString() === transaction.FOR.influencer._id.toString())
        proposal.packages[index].paymentPhase = 'payed'
        await proposal.save()
        // console.log(transaction)
        transaction.status = 'VERIFIED'
        await transaction.save()
        await ctx.answerCbQuery()
    
        await ctx.telegram.sendMessage(transaction.from.chatID, consumerTransactionNText(transaction),updateProposal())
    } catch (error) {
        throw error
    }
})
composer.action(/adminrt+/, async (ctx) => {
    const trID = ctx.callbackQuery.data.split(' ')[1]
    const transaction = await getTransactionByID(trID)
        // console.log(transaction)
    transaction.status = 'REJECTED'
    await transaction.save()
    await ctx.answerCbQuery()
    
    // await ctx.telegram.sendMessage(transaction.from.chatID, consumerTransactionNText(transaction))  HERE SHOULD BE SOME FEEDBACK WHY REJECTED
})

composer.on('callback_query', async (ctx) => {

    const command = ctx.callbackQuery.data.split(' ')[0] // Main action 

    if(!['aa','aai','ra','ai','ri'].includes(command)) return await ctx.answerCbQuery('asds')

    const pID = ctx.callbackQuery.data.split(' ')[1] // proposal ID or registered influencer ID
    const refID = ctx.callbackQuery.data.split(' ')[2] // refers to influencers or admin
   
    const proposal = await getProposalByID(pID,{lean: false,populate: false}) // the main proposal

    if(!proposal && pID && refID) return await ctx.answerCbQuery('Proposal does not exits or deleted!')

    switch (command) {
        case 'aa':
            await approveProposal(ctx, proposal, refID) // refID is admin ID
            break;
        case 'aai':
            await approveIndividual(ctx, proposal, refID) // refID is influencer ID
            break;
        case 'ra':
            await rejectProposal(ctx, proposal)
            break;
        case 'ai':
            await acceptInfluencer(ctx, proposal, refID) // refID is influencer ID
            break;
        case 'ra':
            // await rejectInfluencer(ctx, proposal, pID)
            break;
        default:
            break;
    }    
})

// composer.action(/approvedFor+/, ctx => {
//     const pID
//    
// })


export default composer