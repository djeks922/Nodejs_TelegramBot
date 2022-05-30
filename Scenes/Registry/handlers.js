import { registryButtons } from "./markup.js";
import { createOrUpdateInfluencer,getInfluencerByChatID } from "../../api/service/influencer.js";

export const enter = async (ctx) => {
  try {
    if (!ctx.session.influencer) {
      const _influencer = await getInfluencerByChatID(ctx.session.consumer.chatID, {lean: false,populate:true})
      if(_influencer) {
        // console.log('exist in db but not chat')
        ctx.session.influencer = _influencer
      }else{
        // console.log('1st time registry')
        const influencer = {
          username: ctx.session.consumer.username,
          chatID: ctx.session.consumer.chatID,
          userID: ctx.session.consumer.userID,
          name: ctx.session.consumer.name,
        };
        const _influencer = await createOrUpdateInfluencer(influencer);
        ctx.session.influencer = _influencer
      }
    }
    await ctx.reply(
      `Hi again, ${ctx.message ? ctx.message.from.first_name: ''}\nAdd account details, packages and socials. (Apply for review when you are done with your packages and social accaunts)`,
      registryButtons()
    );
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    await ctx.answerCbQuery("Come back when you feel ready :)");
    await ctx.scene.leave();
    await ctx.deleteMessage()
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
    // console.log("salam");
  } catch (error) {
    throw(error);
  }
};

export const addSocial = async (ctx) => {
  try {
    // console.log("salam");
  } catch (error) {
    throw error;
  }
};
export const addRequirement = async (ctx) => {
  try {
    await ctx.reply('Add')
    ctx.session.influencer.requirement = ctx.session.mes
  } catch (error) {
    throw error;
  }
};
export const addWalletAddress = async (ctx) => {
  try {
    // console.log("salam");
  } catch (error) {
    throw error;
  }
};
export const applyForReview = async (ctx) => {
  try {
    const influencer = ctx.session.influencer
    if(influencer.status === 'inreview') return ctx.answerCbQuery('Already applied!')
    if (influencer.socials.length === 0  || influencer.packages.length === 0)
      return await ctx.answerCbQuery(
        "At least 1 social account and package need for review!"
      );

    influencer.status = 'inreview'
    await influencer.save()
    await ctx.answerCbQuery("Application successfully sent!");
  } catch (error) {
    throw error;
  }
};

export const viewProfile = async (ctx) => {
  try {
    const influencer = ctx.session.influencer
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
