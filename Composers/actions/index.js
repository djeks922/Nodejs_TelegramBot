import { Composer } from "telegraf";
import { getProposalByID } from "../../api/service/proposal.js";
import {
  approveProposal,
  rejectProposal,
  approveIndividual,
  activateInfluencer,
  rejectActivationInfluencer,
  adminVerifiedTransaction,
  adminRejectsTransaction,
} from "./admin.js";
import {
  acceptProposal,
  updateProfile,
  influencerAcceptTransaction,
  influencerRejectsTransaction,
} from "./influencer.js";
import { updateProposals, payForPackage } from "./customer.js";

const composer = new Composer();

// Add actions

composer.action("updateProfile", updateProfile);
composer.action("updateProposal", updateProposals);
composer.action(/admin-activated-influencer+/, activateInfluencer);
composer.action(/admin-rejectedActivation-influencer+/,rejectActivationInfluencer);

composer.action(/oo+/, payForPackage);
composer.action(/infvt+/, influencerAcceptTransaction);
composer.action(/infrt+/, influencerRejectsTransaction);
composer.action(/adminvt+/, adminVerifiedTransaction);
composer.action(/adminrt+/, adminRejectsTransaction);

composer.on("callback_query", async (ctx) => {
  const command = ctx.callbackQuery.data.split(" ")[0]; // Main action

  if (!["aa", "aai", "ra", "ai", "ri"].includes(command))
    return await ctx.answerCbQuery("asds");

  const pID = ctx.callbackQuery.data.split(" ")[1]; // proposal ID or registered influencer ID
  const refID = ctx.callbackQuery.data.split(" ")[2]; // refers to influencers or admin

  const proposal = await getProposalByID(pID, { lean: false, populate: false }); // the main proposal

  if (!proposal && pID && refID)
    return await ctx.answerCbQuery("Proposal does not exits or deleted!");

  switch (command) {
    case "aa":
      await approveProposal(ctx, proposal, refID); // refID is admin ID
      break;
    case "aai":
      await approveIndividual(ctx, proposal, refID); // refID is influencer ID
      break;
    case "ra":
      await rejectProposal(ctx, proposal);
      break;
    case "ai":
      await acceptProposal(ctx, proposal, refID); // refID is influencer ID
      break;
    case "ra":
      // await rejectInfluencer(ctx, proposal, pID)
      break;
    default:
      break;
  }
});


export default composer;
