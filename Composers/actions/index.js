import {Composer} from 'telegraf'
import {getProposalByID} from '../../api/service/proposal.js'
import { approveProposal , rejectProposal} from './admin.js'
import { acceptInfluencer } from './influencer.js'

const composer = new Composer()

// Add actions
composer.on('callback_query', async (ctx) => {
    const command = ctx.callbackQuery.data.split(' ')[0]
    const pID = ctx.callbackQuery.data.split(' ')[1]
    const refID = ctx.callbackQuery.data.split(' ')[2]

    const proposal = await getProposalByID(pID,{lean: false,populate: false}) // the main proposal

    if(!proposal && pID && refID) return await ctx.answerCbQuery('Proposal does not exits or deleted!')

    switch (command) {
        case 'a-a':
            await approveProposal(ctx, proposal, refID)
            break;
        case 'r-a':
            await rejectProposal(ctx, proposal, pID)
            break;
        case 'a-i':
            await acceptInfluencer(ctx, proposal, refID)
            break;
        case 'r-a':
            // await rejectInfluencer(ctx, proposal, pID)
            break;
    
        default:
            break;
    }    
})



export default composer