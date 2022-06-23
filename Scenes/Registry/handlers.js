import {
  registryButtons,
  accountButtons,
  deleteVerifyButtons,
  exitOrLeaveButton,
  removeKeyboard,
  postLinkButtons,
} from "./markup.js";
import { registryText, accountText } from "../../helpers/influencer.js";
import {
  createOrUpdateInfluencer,
  getInfluencerByChatID,
  deleteInfluencerByID,
} from "../../api/service/influencer.js";
import { getProposalByInfluencerID, getProposalByID } from "../../api/service/proposal.js";
import { getTransactionsByFilter } from "../../api/service/transaction.js";
import checkFileExist from "../../helpers/checkFileExist.js";
import { socialButtonsForRegistry } from "./Social/markup.js";

export const enter = async (ctx) => {
  try {
    let buttons;
    let text;
    if (!ctx.session.influencer) {
      const _influencer = await getInfluencerByChatID(
        ctx.session.consumer.chatID,
        { lean: false, populate: true }
      );

      if (_influencer) {
        if(_influencer.status === 'inreview'){
           await ctx.reply(`Dear ${_influencer.name}, Your application is in review. We will update you asap.`)
           return await ctx.scene.leave()
        }
        buttons = _influencer.status.includes("active")
          ? accountButtons()
          : registryButtons();
        text = _influencer.status.includes("active")
          ? accountText(ctx, _influencer.status)
          : registryText(ctx);
        ctx.session.influencer = _influencer;
      } else {
        buttons = registryButtons();
        text = registryText(ctx);
        const influencer = {
          username: ctx.session.consumer.username,
          chatID: ctx.session.consumer.chatID,
          userID: ctx.session.consumer.userID,
          name: ctx.session.consumer.name,
        };
        const _influencer = await createOrUpdateInfluencer(influencer);
        ctx.session.influencer = _influencer;
      }
      await ctx.reply("💬", exitOrLeaveButton());
      // await viewProfileHandler(ctx);
      await ctx.reply(text, buttons);
    } else {
      if(ctx.session.influencer.status === 'inreview'){
        await ctx.reply(`Dear ${ctx.session.influencer.name}, Your application is in review. We will update you asap.`)
        return await ctx.scene.leave()
      }else{
        buttons = ctx.session.influencer.status.includes("active")
        ? accountButtons()
        : registryButtons();
      text = ctx.session.influencer.status.includes("active")
        ? accountText(ctx, ctx.session.influencer.status)
        : registryText(ctx);

      await ctx.reply("💬", exitOrLeaveButton());
      // await viewProfileHandler(ctx);
      await ctx.reply(text, buttons);
      }
    }
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    console.log("registry scene leaved");
  } catch (error) {
    throw error;
  }
};
export const saveleave = async (ctx) => {
  try {
    await ctx.answerCbQuery("Come back when you feel ready :)");
    ctx.session.influencer.save();
    await ctx.scene.leave();
    await ctx.reply("Leaved", removeKeyboard());
    await ctx.deleteMessage();
  } catch (error) {
    throw error;
  }
};

export const onMessage = async (ctx) => {
  try {
    return await ctx.reply(
      "No such option. If you want to add proposal or use other commands save&leave from registry(profile)."
    );
  } catch (error) {
    throw error;
  }
};

export const onCallbackQr = async (ctx) => {
  try {
    await ctx.answerCbQuery("old button");
  } catch (error) {
    throw error;
  }
};

export const socialAction = async (ctx, actionData) => {
  switch (actionData) {
    case "back":
      await ctx.editMessageText(
        `Add account details, packages and socials. (Apply for review when you are done with your packages and social accaunts)`,
        registryButtons()
      );
      break;
    default:
      ctx.scene.enter("influencer-scene-social-id", { platform: actionData });
      break;
  }
};

export const addSocialActions = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];
    await ctx.answerCbQuery();
    socialAction(ctx, data);
  } catch (error) {
    throw error;
  }
};

export const addPackage = async (ctx) => {
  try {
    ctx.scene.enter("influencer-scene-package-id");
  } catch (error) {
    throw error;
  }
};

export const addSocial = async (ctx) => {
  try {
    await ctx.editMessageText(
      "Select social platform",
      socialButtonsForRegistry()
    );
  } catch (error) {
    throw error;
  }
};
export const addRequirement = async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.scene.enter("influencer-scene-requirement-id");
  } catch (error) {
    throw error;
  }
};
export const addWalletAddress = async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.scene.enter("influencer-scene-wallet-id");
  } catch (error) {
    throw error;
  }
};
export const applyForReview = async (ctx) => {
  try {
    const influencer = ctx.session.influencer;
    if (influencer.status === "inreview")
      return await ctx.answerCbQuery("Already applied!");
    if (influencer.status === "active")
      return await ctx.answerCbQuery("Already active!");
    if (influencer.socials.length === 0 || influencer.packages.length === 0)
      return await ctx.answerCbQuery(
        "At least 1 social account and package need for review!"
      );

    influencer.status = "inreview";
    await influencer.save();
    await ctx.answerCbQuery("Application successfully sent!");
  } catch (error) {
    throw error;
  }
};

export const viewProfileHandler = async (ctx) => {
  try {
    const influencer = ctx.session.influencer;
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
    const exist = await checkFileExist(`./public/influencer/${ctx.callbackQuery.from.id}.jpg`)
    exist ? await ctx.replyWithPhoto({source: `./public/influencer/${ctx.callbackQuery.from.id}.jpg`}) : ''
    await ctx.replyWithHTML(
      `<b>username</b>: @${influencer.username}\n<b>Social Accounts</b>:\n ${socialText}\n<b>Packages</b>:\n ${packageText}\nRequirement: ${influencer.requirement}\nWallet: ${influencer.wallet}\nAccount status: ${influencer.status}`,
      { disable_web_page_preview: true }
    );
  } catch (error) {
    throw error;
  }
};

export const viewProfile = async (ctx) => {
  try {
    viewProfileHandler(ctx);
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};

export const deactivate = async (ctx) => {
  try {
    // console.log("salam");
    if (ctx.session.influencer.status === "active") {
      // console.log("icerde");
      ctx.session.influencer.status = "inactive";
      await ctx.session.influencer.save();
      return await ctx.answerCbQuery("Deactivated!");
    }

    // await ctx.reply('You account deactivated!')
    // console.log("sagol");
    await ctx.answerCbQuery("Already inactive");
  } catch (error) {
    throw error;
  }
};
export const activate = async (ctx) => {
  try {
    if (ctx.session.influencer.status === "inactive") {
      ctx.session.influencer.status = "active";
      await ctx.session.influencer.save();
      return await ctx.answerCbQuery("Activated!");
    }

    // await ctx.reply('You account deactivated!')

    await ctx.answerCbQuery("Already active");
  } catch (error) {}
};
export const updateProfile = async (ctx) => {
  try {
    ctx.session.influencer = await getInfluencerByChatID(
      ctx.callbackQuery.message.chat.id,
      { lean: false, populate: true }
    );
    // await ctx.scene.leave()
    await ctx.scene.enter("influencer-scene-id");
    await ctx.answerCbQuery("Profile updated");
  } catch (error) {
    throw error;
  }
};
export const deleteAccVerStep = async (ctx) => {
  try {
    await ctx.editMessageText("Are you sure ?", deleteVerifyButtons());
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async (ctx) => {
  try {
    const data = ctx.callbackQuery.data.split(" ")[1];
    if (data === "Sure") {
      const deletedInfo = await deleteInfluencerByID(
        ctx.session.influencer._id
      );
      if (deletedInfo) {
        ctx.session.influencer = undefined;
        await ctx.deleteMessage();
        await ctx.reply("Successfully deleted!", removeKeyboard());
        await ctx.answerCbQuery("Successfully deleted!");
      } else {
        await ctx.answerCbQuery("Something went wrong");
      }
      await ctx.scene.leave();
    } else {
      await ctx.editMessageText(
        accountText(ctx, ctx.session.influencer.status),
        accountButtons()
      );
    }
  } catch (error) {
    throw error;
  }
};

export const onHearsExit = async (ctx) => {
  try {
    await ctx.reply("Leaved", removeKeyboard());
    await ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};
export const receivedProposals = async (ctx) => {
  try {
    const proposals = await getProposalByInfluencerID(
      ctx.session.influencer._id
    );
    if (proposals.length === 0) {
      await ctx.answerCbQuery()
      return await ctx.reply("You did not receive any proposal");
    }
    let trtext = `Recieved proposals:\n`;
    for (let [i, pr] of proposals.entries()) {
      const pkg = ctx.session.influencer.packages.find(infPkg => pr.packages.find(prPkg => infPkg._id.toString() === prPkg._id.toString()))
      trtext = trtext.concat(`\n${i}. Name: ${pr.name}
  website: ${pr.website}
  twitter: ${pr.twitter}
  telegram: ${pr.twitter}
  description: ${pr.description}
  developerUsername: ${pr.developerUsername}
  contractAddress: ${pr.contractAddress}
  for package: ${pkg.name}
    ------------------------------`);
    }
    await ctx.answerCbQuery()
    await ctx.reply(trtext, postLinkButtons(proposals));
  } catch (error) {
    throw error;
  }
};
export const receivedTransactions = async (ctx) => {
  try {
    const transactions = await getTransactionsByFilter({
      to: ctx.session.influencer._id,
    });
    if (transactions.length === 0) {
      await ctx.answerCbQuery()
      return await ctx.reply("You did not receive any payment");
    }
    let trtext = `Recieved payments:\n`;
    for (let [i, tr] of transactions.entries()) {
      trtext = trtext.concat(`\n${i}. txID: ${tr.txID}
  Proposal name: ${tr.proposal.name}
  Package name: ${tr.package.name}
  Received at: ${tr.createdAt}
  ------------------------------`);
    }
    await ctx.answerCbQuery()
    await ctx.reply(trtext);
  } catch (error) {
    throw error;
  }
};

export const postLink = async (ctx) => {
  try {
    const proposalID = ctx.callbackQuery.data.split(' ')[1]
    const proposal = getProposalByID(proposalID,{lean:false, populate:false})
    await ctx.scene.enter('post-scene-id',{proposal})
  } catch (error) {
    throw error;
  }
};
export const addAvatar = async (ctx) => {
  try {
    await ctx.deleteMessage()
    await ctx.scene.enter('influencer-scene-avatar-id')
    await ctx.answerCbQuery()
  } catch (error) {
    throw error;
  }
};

