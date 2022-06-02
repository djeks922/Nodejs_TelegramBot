import { getInfluencerByChatID } from "../../api/service/influencer.js"


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
export const updateProfile = async (ctx) => {
    ctx.session.influencer = await getInfluencerByChatID(ctx.callbackQuery.message.chat.id,{lean:false,populate:true})
    await ctx.answerCbQuery('Profile updated')
}