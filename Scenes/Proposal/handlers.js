import { influencerButtons, leaveButton, leaveButtonEdited ,sentProposalButton} from "./markup.js";
import { createProposal } from "../../api/service/proposal.js";
import { getInfluencers } from "../../api/service/influencer.js";
import {activeInfluencerChooseList} from '../../helpers/influencer.js'

export const nameStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token website");
    ctx.wizard.state.packages = [];
    ctx.wizard.state.name = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};

export const websiteStep = async (ctx) => {
  try {
    await ctx.reply("Keep going...");
    await ctx.reply("Enter token Contract Address");
    ctx.wizard.state.website = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const contractStep = async (ctx) => {
  try {
    await ctx.reply("Enter token Twitter ");
    ctx.wizard.state.contractAddress = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const twitterStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token telegram");
    ctx.wizard.state.twitter = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const telegramStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token developer telegram username");
    ctx.wizard.state.telegram = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const developerUsernameStep = async (ctx) => {
  try {
    await ctx.reply("Enter your token description");
    ctx.wizard.state.developerUsername = ctx.message.text;
    await ctx.wizard.next();
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};
export const descriptionStep = async (ctx) => {
  try {
    ctx.wizard.state.description = ctx.message.text;
    const influencers = await getInfluencers({status: 'active'},{populate: true});
    // console.log(influencers)
    ctx.wizard.state.infstmp = influencers
    await ctx.replyWithHTML(
      activeInfluencerChooseList(influencers),
      influencerButtons(influencers,ctx.wizard.state.packages),
    );
  } catch (error) {
    ctx.scene.leave();
    throw error;
  }
};

export const enter = async (ctx) => {
  try {
    await ctx.reply(
      `Hi again, ${ctx.message.from.first_name}\nPlease enter your token name`,
      leaveButton()
    );
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  try {
    // console.log(ctx.callbackQuery)
    await ctx.scene.leave();
    await ctx.editMessageReplyMarkup(leaveButtonEdited().reply_markup)
    await ctx.answerCbQuery("Come back when you feel ready :)");
  } catch (error) {
    throw error;
  }
};

export const done = async (ctx) => {
  try {
    if (ctx.wizard.state.packages.length === 0)
      return await ctx.answerCbQuery("You must choose min. 1 Influencer!");

    await ctx.reply("Processing proposal...");
    delete ctx.wizard.state.infstmp
    await createProposal(ctx.wizard.state, ctx.chat.id);
    console.log(ctx.session.proposals)
    ctx.session.proposals.push(ctx.wizard.state)
    await ctx.reply(
      "Thanks for taken time, we will inform you as soon as possible :)"
    );
    await ctx.editMessageReplyMarkup(sentProposalButton().reply_markup)
    await ctx.answerCbQuery("Nicee!");

    return ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const chooseInfluencer_callback = async (ctx) => {
 
  try {
    
  } catch (error) {
    throw error;
  }
};
// export const chooseInfluencer_callback = async (ctx) => {
//   const infID = ctx.callbackQuery.data.split(' ')[1]
//   try {
//     if (ctx.wizard.state.influencers.indexOf(infID) === -1) {
//       await ctx.wizard.state.influencers.push(infID);
//       // await ctx
//       await ctx.answerCbQuery("Nice chose :)");
//     } else {
//       await ctx.answerCbQuery("Already added", { show_alert: true });
//     }
//   } catch (error) {
//     throw error;
//   }
// };
