import { getProposals } from "../../api/service/proposal.js";

export const updateProposals = async (ctx) => {
  try {
    ctx.session.proposals = await getProposals({
      consumer: ctx.session.consumer,
    });
    await ctx.answerCbQuery("Proposals updated");
  } catch (error) {
    throw error;
  }
};

export const payForPackage = async (ctx) => {
  try {
    const proposalID = ctx.callbackQuery.data.split(" ")[1];
    const pkgID = ctx.callbackQuery.data.split(" ")[2];
    // console.log(ctx)
    await ctx.scene.enter("payment-scene-toAdmin-id", { proposalID, pkgID });
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
