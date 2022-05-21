import { deleteProposalByID } from "../../api/service/proposal.js";

export const approveProposal = async (ctx, proposal, refID) => {
  if (proposal.status === "staged") {
    proposal.status = "approved";
    proposal.approvedBy = refID;
    await proposal.save();
    await ctx.answerCbQuery("Approved!");
  } else {
    await ctx.answerCbQuery(
      `Already approved by ${proposal.approvedBy.username} !`
    );
  }
};

export const rejectProposal = async (ctx, proposal, pID) => {
  if (proposal.approvedBy)
    return await ctx.answerCbQuery(
      `Proposal was approved by ${proposal.approvedBy.username}`
    );

  const res = await deleteProposalByID(pID);

  if (!res.deletedCount)
    return await ctx.answerCbQuery("Proposal already deleted!");

  await ctx.answerCbQuery("Proposal deleted successfully!");
};
