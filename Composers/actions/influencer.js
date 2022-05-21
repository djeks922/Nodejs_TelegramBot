

export const acceptInfluencer = async (ctx,proposal,refID) => {
    proposal.status !== 'accepted' ? proposal.status = 'accepted' : undefined
    if(proposal.acceptedBy.indexOf(refID) === -1){
        proposal.acceptedBy.push(refID)
        await proposal.save()
        await ctx.answerCbQuery('Accepted!')
    }else {
        await ctx.answerCbQuery('Already accepted!')
    }
   
}