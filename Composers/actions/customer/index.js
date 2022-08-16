import { getProposals } from "../../../api/service/proposal.js";
import { getTransactionByID } from "../../../api/service/transaction.js";
import { paymentButtons } from "../../commands/markup.js";

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
export const rePayForPackage = async (ctx) => {
  try {
    const trID = ctx.callbackQuery.data.split(" ")[1];
    // console.log(trID)
    const transaction = await getTransactionByID(trID);

    await ctx.scene.enter("payment-scene-toAdmin-id", { transaction });
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};

export const showProposal = async (ctx) => {
  try {
    const pID = ctx.callbackQuery.data.split(" ")[1];
  
    const proposal = ctx.session.proposals && ctx.session.proposals.find((proposal) => {
      return proposal._id.toString() === pID.toString()
    })
    await ctx.answerCbQuery();
    let proposalText = ``;
    proposalText = proposalText.concat(
      `Token: ${proposal.name}\n  Contract address: ${
        proposal.contractAddress
      }\n  Description:
       ${proposal.description}\n  Developer: ${
        "@" + proposal.developerUsername
      }\n  Telegram: ${proposal.telegram}\n  Twitter: ${
        proposal.twitter
      }\n  Website: ${proposal.website}\n  Staged date: ${
        proposal.createdAt
      }\n`
    );
    let packagesText = `  Applied packages: \n`;
    for (let [i, pkg] of proposal.packages?.entries()) {
      packagesText = packagesText.concat(
        `    ${i}. Influencer: ${pkg.influencer?.name}, Package: ${
          pkg.name + `(${pkg.price})`
        }\n        Status: ${
          proposal.rejectedForByI.some(
            (pkgR) => pkg._id.toString() === pkgR._id.toString()
          )
            ? "Rejected by Influencer❌,"
            : proposal.acceptedBy.some(
                (pkgA) =>
                  pkg.influencer._id.toString() === pkgA._id.toString()
              )
            ? "accepted✅,"
            : proposal.rejectedFor.some(
                (pkgR) => pkg._id.toString() === pkgR._id.toString()
              )
            ? "Rejected by admin❌,"
            : proposal.approvedFor.some(
                (pkgA) => pkg.influencer._id.toString() === pkgA.toString()
              )
            ? "approved✅,"
            : proposal.status === "approved"
            ? "approved✅" : ""
        } \n`
      );
    }
    proposalText = proposalText.concat(packagesText);

    await ctx.reply(proposalText,await paymentButtons([proposal]));
  } catch (error) {
    throw error
  }
}
