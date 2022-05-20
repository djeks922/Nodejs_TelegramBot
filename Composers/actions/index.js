import {Composer} from 'telegraf'
import {updateProposalByID ,deleteProposalByID, getProposalByID} from '../../api/service/proposal.js'
const composer = new Composer()

// Add actions
composer.on('callback_query', async (ctx) => {
    const command = ctx.callbackQuery.data.split(' ')[0]
    const pID = ctx.callbackQuery.data.split(' ')[1]
    const refID = ctx.callbackQuery.data.split(' ')[2]

    const proposal = await getProposalByID(pID,{'populate': false}) // the main proposal
    if(!proposal) return await ctx.answerCbQuery('Proposal does not exits or deleted!')

    if(command === 'a-a'){

        if(proposal.status === 'staged'){
            proposal.status = 'approved'
            proposal.approvedBy = refID
            await proposal.save()
            await ctx.answerCbQuery('Approved!')
        }else{
            await ctx.answerCbQuery(`Already approved by ${proposal.approvedBy.username} !`)
        }
        
    }
    if(command === 'r-a'){

        if(proposal.approvedBy) return await ctx.answerCbQuery(`Proposal was approved by ${proposal.approvedBy.userName}`)
        
        const res = await deleteProposalByID(pID)

        if(!res.deletedCount) return await ctx.answerCbQuery('Proposal already deleted!')
        
        await ctx.answerCbQuery('Proposal deleted successfully!')
    }
    if(command === 'a-i'){
        proposal.status !== 'accepted' ? proposal.status = 'accepted' : undefined
        if(proposal.acceptedBy.indexOf(refID) === -1){
            proposal.acceptedBy.push(refID)
            await proposal.save()
            await ctx.answerCbQuery('Accepted!')
        }else {
            await ctx.answerCbQuery('Already accepted!')
        }
       
    }
    if(command === 'r-i'){
        // influencer rejects the proposal
    }
    
})



export default composer