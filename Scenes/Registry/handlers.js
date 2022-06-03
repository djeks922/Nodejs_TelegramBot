import {
  registryButtons,
  accountButtons,
  deleteVerifyButtons,
} from "./markup.js";
import { registryText, accountText } from "../../helpers/influencer.js";
import {
  createOrUpdateInfluencer,
  getInfluencerByChatID,
  deleteInfluencerByID,
} from "../../api/service/influencer.js";

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
      await ctx.reply(text, buttons);
    } else {
      buttons = ctx.session.influencer.status.includes("active")
        ? accountButtons()
        : registryButtons();
      text = ctx.session.influencer.status.includes("active")
        ? accountText(ctx, ctx.session.influencer.status)
        : registryText(ctx);

      await ctx.reply(text, buttons);
    }
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    await ctx.answerCbQuery("Come back when you feel ready :)");
    await ctx.scene.leave();
    await ctx.deleteMessage();
  } catch (error) {
    throw error;
  }
};

export const socialAction = async (ctx, actionData) => {
  switch (actionData) {
    case "back":
      await ctx.editMessageText(
        `Hi again, ${
          ctx.message ? ctx.message.from.first_name : ""
        }\nAdd account details, packages and socials. (Apply for review when you are done with your packages and social accaunts)`,
        registryButtons()
      );
      break;
    default:
      ctx.scene.enter("influencer-scene-social-id", { platform: actionData });
      break;
  }
};

export const addPackage = async (ctx) => {
  try {
  } catch (error) {
    throw error;
  }
};

export const addSocial = async (ctx) => {
  try {
  } catch (error) {
    throw error;
  }
};
export const addRequirement = async (ctx) => {
  try {
    await ctx.reply("Add");
    ctx.session.influencer.requirement = ctx.session.mes;
  } catch (error) {
    throw error;
  }
};
export const addWalletAddress = async (ctx) => {
  try {
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

export const viewProfile = async (ctx) => {
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
    await ctx.replyWithHTML(
      `<b>username</b>: @${influencer.username}\n<b>Social Accounts</b>:\n ${socialText}\n<b>Packages</b>:\n ${packageText}\nRequirement: ${influencer.requirement}\nWallet: ${influencer.wallet}\nAccount status: ${influencer.status}`,
      { disable_web_page_preview: true }
    );
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};

export const deactivate = async (ctx) => {
  try {
    console.log("salam");
    if (ctx.session.influencer.status === "active") {
      console.log("icerde");
      ctx.session.influencer.status = "inactive";
      await ctx.session.influencer.save();
      return await ctx.answerCbQuery("Deactivated!");
    }

    // await ctx.reply('You account deactivated!')
    console.log("sagol");
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
    await ctx.answerCbQuery("Profile updated");
  } catch (error) {
    throw error;
  }
};
export const deleteAccVerStep = async (ctx) => {
  try {
    await ctx.editMessageText('Are you sure ?',deleteVerifyButtons());
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
      if (deletedInfo.deletedCount) {
        ctx.session.influencer = undefined;
        await ctx.deleteMessage();
        await ctx.reply("Successfully deleted!");
        await ctx.answerCbQuery("Successfully deleted!");
      } else {
        await ctx.answerCbQuery("Something went wrong");
      }
      await ctx.scene.leave();
    } else {
      await ctx.editMessageText(accountText(ctx,ctx.session.influencer.status),accountButtons())
    }
  } catch (error) {
    throw error;
  }
};
