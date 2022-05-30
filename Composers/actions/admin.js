import { deleteProposalByID } from "../../api/service/proposal.js";
import { getConsumerByChatID } from '../../api/service/consumer.js'
import { getInfluencerByID,createOrUpdateInfluencer } from '../../api/service/influencer.js'


export const approveProposal = async (ctx, proposal, refID) => {
  if (proposal.status === "staged") {
    proposal.status = "approved";
    proposal.approvedBy = refID;
    proposal.approvedForID = proposal.influencers
    await proposal.save();
    await ctx.answerCbQuery("Approved!");
  } else {
    await ctx.answerCbQuery(
      `Already approved by ${proposal.approvedBy.username} !`
    );
  }
};

export const approveIndividual = async (ctx, proposal, approvedForID) => {
  try {
    if(proposal.approvedFor.indexOf(approvedForID) === -1) {
      const admin = await getConsumerByChatID(ctx.callbackQuery.from.id) 
      proposal.approvedFor.push(approvedForID)
      proposal.approvedBy = proposal.approvedBy ?? admin
      await proposal.save()
      await ctx.answerCbQuery(`Approved for Influencer with id: ${approvedForID}`)
    }else{
      await ctx.answerCbQuery(`Already approved for Influencer : ${approvedForID}`)
    }
  } catch (error) {
    throw error
  }
}

export const rejectProposal = async (ctx, proposal) => {
  if (proposal.approvedBy)
    return await ctx.answerCbQuery(
      `Proposal was approved by ${proposal.approvedBy.username}`
    );

  const res = await deleteProposalByID(proposal._id);

  if (!res.deletedCount)
    return await ctx.answerCbQuery("Proposal already deleted!");

  await ctx.answerCbQuery("Proposal deleted successfully!");
};


export const activateInfluencer = async(ctx) => {
  const id = ctx.callbackQuery.data.split(' ')[1]
  await createOrUpdateInfluencer({_id:id}, {status: 'active'})
}

export const rejectActivationInfluencer = async(ctx) => {
  const id = ctx.callbackQuery.data.split(' ')[1]
  await createOrUpdateInfluencer({_id:id}, {status: 'inactive'})
}