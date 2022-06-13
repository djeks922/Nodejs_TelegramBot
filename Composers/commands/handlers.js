import { paymentButtons } from "./markup.js";

export const add = async (ctx) => {
  try {
    if(ctx.message.chat.type === 'supergroup') return
    await ctx.scene.enter("consumer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const register = async (ctx) => {
  try {
    if(ctx.message.chat.type === 'supergroup') return
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const myproposals = async (ctx) => {
  try {
    if(ctx.message.chat.type === 'supergroup') return


    ctx.session.proposals = await ctx.session.proposals;
    // console.log("myproposals", ctx.session.proposals);
    let proposalText = `My proposals - (Make your payments to this address: ${process.env.Wallet})\n----------------------\n\n`;
    if (ctx.session.proposals?.length === 0)
      return await ctx.reply("You do not have any proposal");
    for (let [i, proposal] of ctx.session.proposals?.entries()) {
      proposalText = proposalText.concat(
        `${i}.Token: ${proposal.name}\n  Contract address: ${
          proposal.contractAddress
        }\n  Description: ${proposal.description}\n  Developer: ${
          "@" + proposal.developerUsername
        }\n  Telegram: ${proposal.telegram}\n  Twitter: ${
          proposal.twitter
        }\n  Website: ${proposal.website}\n  Status: ${
          proposal.status
        }\n  Staged date : ${proposal.createdAt}\n`
      );
      let packagesText = `  Applied packages: \n`;
      for (let [i, pkg] of proposal.packages?.entries()) {
        packagesText = packagesText.concat(
          `    ${i}. Influencer: ${pkg.influencer?.name}, Package: ${
            pkg.name + `(${pkg.price})`
          }\n`
        );
      }
      proposalText = proposalText.concat(packagesText);
      proposalText = proposalText.concat(
        "----------------------------------------\n"
      );
    }

    await ctx.reply(proposalText, await paymentButtons(ctx.session.proposals));
  } catch (error) {
    throw error;
  }
};

export const verifiedTransactions = async (ctx) => {
  try {
    if(ctx.message.chat.type === 'private') return
    await ctx.scene.enter("payment-scene-toInfluencer-id");
  } catch (error) {
    throw error;
  }
};
