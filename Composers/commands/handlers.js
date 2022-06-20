import { getConsumerCount } from "../../api/service/consumer.js";
import {
  getInfluencerCount,
  getInfluencers,
  getInfluencerByUsername,
} from "../../api/service/influencer.js";
import { getProposalCount } from "../../api/service/proposal.js";
import {
  getTransactionCount,
  getTransactionByTxID,
  getTransactionsByKeyword
} from "../../api/service/transaction.js";

import { paymentButtons } from "./markup.js";

export const add = async (ctx) => {
  try {
    if (ctx.message.chat.type === "supergroup") return;
    await ctx.scene.enter("consumer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const register = async (ctx) => {
  try {
    if (ctx.message.chat.type === "supergroup") return;
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }
};

export const myproposals = async (ctx) => {
  try {
    if (ctx.message.chat.type === "supergroup") return;

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
        "-----------------------------------------------------------------------------------------------------\n"
      );
    }

    await ctx.reply(proposalText, await paymentButtons(ctx.session.proposals));
  } catch (error) {
    throw error;
  }
};

export const verifiedTransactions = async (ctx) => {
  try {
    if (ctx.message.chat.type === "private") return;
    await ctx.scene.enter("payment-scene-toInfluencer-id");
  } catch (error) {
    throw error;
  }
};
export const stat = async (ctx) => {
  try {
    if (ctx.message.chat.type === "private") return;
    let statText = `Bot stat: \n`;
    let promises = [];

    promises.push(getConsumerCount());

    promises.push(getInfluencerCount());
    promises.push(getInfluencerCount({ status: "staged" }));
    promises.push(getInfluencerCount({ status: "inreview" }));
    promises.push(getInfluencerCount({ status: "active" }));
    promises.push(getInfluencerCount({ status: "inactive" }));

    promises.push(getProposalCount());
    promises.push(getProposalCount({ status: "staged" }));
    promises.push(getProposalCount({ status: "approved" }));
    promises.push(getProposalCount({ status: "rejected" }));

    promises.push(getTransactionCount());
    promises.push(getTransactionCount({ onUser: "tg-consumer" }));
    promises.push(getTransactionCount({ onUser: "tg-influencer" }));

    await ctx.reply("Proccessing up to date data...Please be patient");
    const results = await Promise.all(promises);

    statText = statText.concat(`Consumers: ${results[0]}
Influencers total: ${results[1]}
    staged: ${results[2]}
    inreview: ${results[3]}
    active: ${results[4]}
    inactive: ${results[5]}
Proposals total: ${results[6]}
    staged: ${results[7]}
    approved: ${results[8]}
    rejected: ${results[9]}
Transactions total: ${results[10]} 
    Consumer side: ${results[11]}
    Admin side: ${results[12]}`);

    await ctx.reply(statText);
  } catch (error) {
    throw error;
  }
};

export const retrieveInfluencers = async (ctx) => {
  try {
    if (ctx.message.chat.type === "private") return;
    if (ctx.message.text.split(" ")[1]) {
      // console.log(ctx.message.text.split(' ')[1])
      const influencer = await getInfluencerByUsername(
        username,
        { populate: true }
      );
      if (!influencer) {
        return await ctx.reply("Not found");
      }
      let socialText = ``;
      for (let [i, social] of influencer.socials.entries()) {
        socialText = socialText.concat(
          `${i}. ${social.platform}: ${social.url}\n`
        );
      }
      let packageText = ``;
      for (let [i, pkg] of influencer.packages.entries()) {
        packageText = packageText.concat(`${i}. ${pkg.name}: ${pkg.price}\n`);
      }
      await ctx.replyWithHTML(
        `<b>username</b>: @${influencer.username}\n<b>Social Accounts</b>:\n ${socialText}\n<b>Packages</b>:\n ${packageText}\nRequirement: ${influencer.requirement}\nWallet: ${influencer.wallet}\nAccount status: ${influencer.status}`,
        { disable_web_page_preview: true }
      );
    } else {
      const influencers = await getInfluencers(
        {},
        { lean: true, populate: false },
        { limit: 30 }
      );

      let infText = `Basic influencers infos:\n`;
      for (let [i, inf] of influencers.entries()) {
        infText = infText.concat(`${i}. Username: @${inf.username}\n`);
      }

      await ctx.reply(infText);
      await ctx.reply(
        `To get more info about spesific influencer
,type '/getinfluencers glyv9' for example (without @)`
      );
    }
  } catch (error) {
    throw error;
  }
};

export const getTransactionTx = async (ctx) => {
  try {
    if (ctx.message.chat.type === "private") return;
    const txID = ctx.message.text.split(" ")[1];
    if(!txID){
      return await ctx.reply(`Please use it as '/transactionbytx transaction_id'`)
    }
    const transaction = await getTransactionByTxID(txID);

    if (transaction) {
      await ctx.reply(`Transaction: ${transaction._id}
From: @${transaction.from.username}
To: @${transaction.to.username}
txID: ${transaction.txID}
Made by: ${transaction.onUser === "tg-consumer" ? "consumer" : "admin"}
Status: ${transaction.status}
Proposal name: ${transaction.proposal.name}
Package name: ${transaction.package.name}
Created at: ${transaction.createdAt}`);
    } else {
      await ctx.reply("Transaction not found");
    }
  } catch (error) {
    throw error;
  }
};

export const getTransactionKeyword = async (ctx) => {
  try {
    if (ctx.message.chat.type === "private") return;
    const keyWord = ctx.message.text.split(" ")[1];
    await ctx.reply('Processing...')
    const transactions = await getTransactionsByKeyword(keyWord)
    let trText = `Transaction for keyword: ${keyWord}\n`
    for(let [i,tr] of transactions.entries()){
      trText = trText.concat(`\n${i}.Transaction id: ${tr._id}
txID: ${tr.txID}
From: ${tr.from.username}
To: @${tr.to.username}
Status: ${tr.status}
${tr.forwarded ? `Payed to Influencer: @${tr.package.influencer.username}`: 'Payed to Admin'}
Proposal: ${tr.proposal.name}
Package: ${tr.package.name}
CreatedAt: ${tr.createdAt}
--------------------------`)
    }
    await ctx.reply(trText)
  } catch (error) {
    throw error;
  }
};
