import {Composer} from 'telegraf'
import {getProposalByID} from '../../api/service/proposal.js'
import { approveProposal , rejectProposal ,approveIndividual, activateInfluencer,rejectActivationInfluencer} from './admin.js'
import { acceptInfluencer,updateProfile } from './influencer.js'

const composer = new Composer()

// Add actions


composer.action(/updateP/, updateProfile)
composer.action(/admin-activated-influencer+/, activateInfluencer)
composer.action(/admin-rejectedActivation-influencer+/, rejectActivationInfluencer)

composer.on('callback_query', async (ctx) => {

    const command = ctx.callbackQuery.data.split(' ')[0] // Main action 

    if(!['aa','aai','ra','ai','ri'].includes(command)) return await ctx.answerCbQuery('asds')

    const pID = ctx.callbackQuery.data.split(' ')[1] // proposal ID or registered influencer ID
    const refID = ctx.callbackQuery.data.split(' ')[2] // refers to influencers or admin
    // console.log(command, pID,refID)
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
//     console.log(ctx, 'action approved for')
// })


export default composer