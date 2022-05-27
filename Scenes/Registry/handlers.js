import { registryButtons } from "./markup.js";
import { createOrUpdateInfluencer, createPackage, createSocial,getInfluencerByUserID } from "../../api/service/influencer.js";

export const enter = async (ctx) => {
  try {
    await ctx.reply(
      `Hi again, ${ctx.message ? ctx.message.from.first_name: ''}\nAdd:`,
      registryButtons()
    );

    if (!ctx.session.influencer) {
      ctx.session.influencer = ctx.session.consumer;
      ctx.session.influencer.socials = [];
      ctx.session.influencer.packages = [];
      ctx.session.influencer.status = 'inactive'
    }
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    await ctx.answerCbQuery("Come back when you feel ready :)");
    await ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const socialAction = async (ctx,actionData) => {
  switch (actionData) {
    case "back":
      await ctx.editMessageReplyMarkup(registryButtons().reply_markup);
      break;
    default:
      ctx.scene.enter('influencer-scene-social-id',{platform : actionData})
      break;
  }
}

export const addPackage = async (ctx) => {
  try {
    console.log("salam");
  } catch (error) {
    console.log(error);
  }
};

export const addSocial = async (ctx) => {
  try {
    console.log("salam");
  } catch (error) {
    throw error;
  }
};
export const addRequirement = async (ctx) => {
  try {
    console.log("salam");
  } catch (error) {
    throw error;
  }
};
export const addWalletAddress = async (ctx) => {
  try {
    console.log("salam");
  } catch (error) {
    throw error;
  }
};
export const applyForReview = async (ctx) => {
  try {
    let infl = await getInfluencerByUserID(ctx.callbackQuery.from.id) 
    if(infl) return ctx.answerCbQuery('Already applied!')
    if (ctx.session.influencer.socials.length === 0  || ctx.session.influencer.packages.length === 0)
      return await ctx.answerCbQuery(
        "At least 1 social account and package need for review!"
      );
    const influencer = {
      username: ctx.session.influencer.username,
      chatID: ctx.session.influencer.chatID,
      userID: ctx.session.influencer.userID,
      name: ctx.session.influencer.name,
    };
    const inf = await createOrUpdateInfluencer(influencer,{status:'inreview'});

    ctx.session.influencer.id = inf._id

    const socials = ctx.session.influencer.socials
    for(let social of socials) {
      const s = await createSocial(inf._id,social)
    }

    const packages = ctx.session.influencer.packages
    for(let pkg of packages) {
      const p = await createPackage(inf._id,pkg)
    }
    ctx.session.influencer.status = inf.status
    await ctx.answerCbQuery("Application successfully sent!");
  } catch (error) {
    throw error;
  }
};

export const viewProfile = async (ctx) => {
  try {
    let socialText = ``;
    for (let [i, social] of ctx.session.influencer.socials.entries()) {
      socialText = socialText.concat(
        `${i}. ${social.platform}: ${social.url}\n`
      );
    }
    let packageText = ``;
    for (let [i, pkg] of ctx.session.influencer.packages.entries()) {
      packageText = packageText.concat(`${i}. ${pkg.name}: ${pkg.price}\n`);
    }
    await ctx.replyWithHTML(
      `<b>username</b>: @${ctx.session.influencer.username}\n<b>Social Accounts</b>:\n ${socialText}\n<b>Packages</b>:\n ${packageText}\n`,
      { disable_web_page_preview: true }
    );
    await ctx.answerCbQuery();
  } catch (error) {
    throw error;
  }
};
