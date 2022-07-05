import {
  deleteProposalByID,
  updateProposalByID,
} from "../../../api/service/proposal.js";
import { getConsumerByID } from "../../../api/service/consumer.js";
import {
  updateInfluencer,
  getInfluencerByID,
} from "../../../api/service/influencer.js";
// import { consumerTransactionNText } from "../../../helpers/consumer.js";
import { getTransactionByID } from "../../../api/service/transaction.js";
import {
  adminButtons,
  adminButtonsApproved,
  adminButtonsRejected,
  updateProposal,
} from "../../../api/utils/proposal/markup.js";
import { getProposalByID } from "../../../api/service/proposal.js";
import { Markup } from "telegraf";
import {
  adminRejectsTransactionText,
  rejectIndividualConsumerText,
  consumerTransactionNText
} from "./text.js";

import checkFileExist from "../../../helpers/checkFileExist.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
//
const approveButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("sure", `app Sure`),
    Markup.button.callback("cancel", `app Cancel`),
  ]);
};
export const approveProposal = async (ctx, proposal) => {
  try {
    if (proposal.status === "rejected") {
      ctx.session.currentRejectedProposal = proposal;
      await ctx.answerCbQuery();
      return await ctx.reply(
        `Proposal rejected,Are you sure to approve it?`,
        approveButtons()
      );
    }
    if (proposal.status === "approved") {
      await ctx.answerCbQuery(
        `Already approved by @${proposal.approvedBy?.username}, for all Influencers !`
      );
    } else {
      proposal.status = "approved";
      proposal.approvedBy = ctx.session.consumer._id;
      await proposal.save();
      await ctx.editMessageText(
        ctx.callbackQuery.message.text,
        adminButtonsApproved(proposal)
      );
      await ctx.answerCbQuery("Approved successfully!");
    }
  } catch (error) {
    throw error;
  }
};

export const approveProposal_rejectCase = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];

    if (data === "Sure") {
      await updateProposalByID(ctx.session.currentRejectedProposal._id, {
        status: "approved",
        approvedBy: ctx.session.consumer._id,
      });
      await ctx.answerCbQuery("Approved successfully!");
      await ctx.deleteMessage();
    } else {
      ctx.session.currentRejectedProposal = undefined;
      await ctx.answerCbQuery("Canceled!");
      await ctx.deleteMessage();
    }
  } catch (error) {}
};

export const approveIndividual = async (ctx, proposal, approvedForID) => {
  try {
    const index = proposal.approvedFor.indexOf(approvedForID);
    if (index === -1) {
      // const admin = await getConsumerByID(ctx.session.consumer._id);
      proposal.approvedFor.push(approvedForID);
      proposal.approvedBy = proposal.approvedBy ?? ctx.session.consumer._id;
      await proposal.save();
      await proposal.populate("approvedFor");
      await ctx.answerCbQuery(
        `Approved for Influencer: @${
          proposal.approvedFor[proposal.approvedFor.length - 1].username
        }`
      );
      await proposal.populate({ path: "packages", populate: "influencer" });
      await ctx.editMessageText(
        ctx.callbackQuery.message.text,
        adminButtons(proposal, 1)
      );
    } else {
      await proposal.populate("approvedFor");
      await ctx.answerCbQuery(
        `Already approved for Influencer : @${proposal.approvedFor[index].username}`
      );
    }
  } catch (error) {
    throw error;
  }
};

//************************************    Approvement Ends   HERE        ******************************** */
const rejectButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("sure", `rej Sure`),
    Markup.button.callback("cancel", `rej Cancel`),
  ]);
};

export const rejectProposal_Admin = async (ctx, proposal) => {
  try {
    // if (proposal.approvedBy) {
    //   ctx.session.currentRejectedProposal = proposal;
    //   await ctx.answerCbQuery();
    //   return await ctx.reply(
    //     `Proposal approved by ${proposal.approvedBy.username},Are you sure to reject it?`,
    //     rejectButtons()
    //   );
    // }
    if (proposal.status === "rejected")
      return await ctx.answerCbQuery("Proposal already rejected!");

    if (proposal.status === "approved") {
      const res = await updateProposalByID(proposal._id, {
        status: "rejected",
        approvedBy: null,
      });
      if (!res.matchedCount)
        return await ctx.answerCbQuery(
          "The proposal too old, or maybe deleted"
        );
    } else {
      const res = await updateProposalByID(proposal._id, {
        status: "rejected",
      });

      if (!res.matchedCount)
        return await ctx.answerCbQuery(
          "The proposal too old, or maybe deleted"
        );
    }
    await ctx.editMessageText(
      ctx.callbackQuery.message.text,
      adminButtonsRejected(proposal)
    );
    await ctx.answerCbQuery("Proposal rejected successfully!");
  } catch (error) {
    throw error;
  }
};

// export const rejectAdminProposal_approvedCase = async (ctx) => {
//   try {
//     const data = ctx.callbackQuery.data.split(" ")[1];
//     const proposal = await ctx.session.currentRejectedProposal.populate(
//       "consumer"
//     );
//     console.log(proposal);
//     if (data === "Sure") {
//       await updateProposalByID(proposal._id, {
//         status: "rejected",
//         approvedBy: null,
//       });
//       await ctx.telegram.sendMessage(
//         proposal.consumer.chatID,
//         `Your proposal (Token name): ${proposal.name} fully rejected for all packages, even if it was approved before`
//       );
//       await ctx.answerCbQuery("Proposal rejected successfully!");
//       await ctx.deleteMessage();
//       await ctx.editMessageText(
//         ctx.callbackQuery.message.text,
//         adminButtonsRejected(proposal)
//       );
//     } else {
//       ctx.session.currentRejectedProposal = undefined;
//       await ctx.deleteMessage();
//       await ctx.answerCbQuery("Canceled!");
//     }
//   } catch (error) {
//     throw error;
//   }
// };

export const rejectIndividual = async (ctx, proposal, rejectForID) => {
  try {
    await proposal.populate("packages");

    // console.log(proposal)
    const pkg = proposal.packages.find(
      (pkg) => pkg.influencer.toString() === rejectForID.toString()
    );

    if (
      proposal.rejectedFor.some(
        (pkgID) => pkgID.toString() === pkg._id.toString()
      )
    )
      return await ctx.answerCbQuery(`Already rejected!`);

    proposal.rejectedFor.push(pkg._id);

    await proposal.populate("consumer");
    await ctx.telegram.sendMessage(
      proposal.consumer.chatID,
      rejectIndividualConsumerText(proposal, pkg)
    );
    await proposal.save();
    await proposal.populate({ path: "packages", populate: "influencer" });
    await ctx.editMessageText(
      ctx.callbackQuery.message.text,
      adminButtons(proposal, 1)
    );
    await ctx.answerCbQuery("rejected!");
  } catch (error) {
    throw error;
  }
};

export const createInfluencerOnWebb = async (id) => {
  try {
    const _influencer = await getInfluencerByID(id, {
      lean: true,
      populate: true,
    });
    const form = new FormData();
    form.append("name", _influencer.name);
    form.append("requirements", _influencer.requirement);
    form.append("volume", "MEDIUM");
    const exist = await checkFileExist(_influencer.avatar);
    exist
      ? form.append("avatarImage", fs.createReadStream(_influencer.avatar))
      : "";
    //
    const res = await axios.post(
      "http://localhost:3001/api/internal/influencer/",
      form,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU5MDM3NDh9.8__ByfMv9c6zi1A1OJLgjT94W2TN1XRq1rYU1hl5k-o",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(webInfluencer)
    for (let social of _influencer.socials) {
      await axios.post(
        `http://localhost:3001/api/internal/social/${res.data._id}`,
        {
          link: social.url,
          platform: social.platform,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU5MDM3NDh9.8__ByfMv9c6zi1A1OJLgjT94W2TN1XRq1rYU1hl5k-o",
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

export const activateInfluencer = async (ctx) => {
  try {
    const id = ctx.callbackQuery.data.split(" ")[1];
    const res = await updateInfluencer(id, { status: "active" });
    if (!res.modifiedCount)
      return await ctx.answerCbQuery("Already activated!");
    await createInfluencerOnWebb(id);
    await ctx.answerCbQuery("activated!");
  } catch (error) {
    throw error;
  }
};

export const rejectActivationInfluencer = async (ctx) => {
  try {
    // REJECT ACTIVATION INFLUENCER REGISTRY
  } catch (error) {
    throw error;
  }
};

export const adminVerifiedTransaction = async (ctx) => {
  try {
    const trID = ctx.callbackQuery.data.split(" ")[1];
    // console.log(ctx.callbackQuery.from,ctx.callbackQuery.message)
    const transaction = await getTransactionByID(trID);

    if (transaction.status === "VERIFIED-admin")
      return await ctx.answerCbQuery("Already verified!");

    // const proposal = await getProposalByID(transaction.proposal._id, {
    //   lean: false,
    //   populate: true,
    // });
    // // console.log(proposal.packagesPayedToAdmin)
    // proposal.packagesPayedToAdmin.push(transaction.package._id);
    // await proposal.save();
    // // console.log(transaction)
    transaction.status = "VERIFIED-admin";
    await transaction.save();
    await ctx.editMessageText(`${ctx.callbackQuery.message.text}`, {
      reply_markup: {
        inline_keyboard: [[{ text: "verified✅", callback_data: "ykhjyk" }]],
      },
    });
    await ctx.answerCbQuery();

    await ctx.telegram.sendMessage(
      transaction.from.chatID,
      consumerTransactionNText(transaction),
      updateProposal()
    );
  } catch (error) {
    throw error;
  }
};

export const adminRejectsTransaction = async (ctx) => {
  const trID = ctx.callbackQuery.data.split(" ")[1];
  const transaction = await getTransactionByID(trID);
  // console.log(transaction)
  transaction.status = "REJECTED-admin";
  await transaction.save();

  await ctx.editMessageText(`${ctx.callbackQuery.message.text}`, {
    reply_markup: {
      inline_keyboard: [[{ text: "rejected❌", callback_data: "ykhjyk" }]],
    },
  });
  await ctx.telegram.sendMessage(
    transaction.from.chatID,
    adminRejectsTransactionText(transaction)
  );
  await ctx.answerCbQuery();

  // await ctx.telegram.sendMessage(transaction.from.chatID, consumerTransactionNText(transaction))  HERE SHOULD BE SOME FEEDBACK WHY REJECTED
};
