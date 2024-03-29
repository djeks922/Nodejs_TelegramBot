import {
  influencerButtons,
  leaveButton,
  leaveButtonEdited,
  sentProposalButton,
  packagesButtons,
} from "./markup.js";
import { createProposal, getProposals } from "../../api/service/proposal.js";
import { getInfluencers } from "../../api/service/influencer.js";
import { activeInfluencerChooseListText } from "./text.js";
import { getInfluencerByID } from "../../api/service/influencer.js";

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
    const influencers = await getInfluencers(
      { status: "active" },
      { populate: true }
    );

    ctx.wizard.state.infstmp = influencers;
    await ctx.replyWithHTML(
      activeInfluencerChooseListText(influencers),
      influencerButtons(influencers, ctx.wizard.state.packages)
    );
    // await ctx.reply('Choose Influencer`s packages', Markup.inlineKeyboard([Markup.button.webApp('open', 'https://138f-95-86-155-168.eu.ngrok.io/')]).resize())
    await ctx.wizard.next()
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
    await ctx.scene.leave();
    await ctx.editMessageReplyMarkup(leaveButtonEdited().reply_markup);
    await ctx.answerCbQuery("Come back when you feel ready :)");
  } catch (error) {
    throw error;
  }
};

export const onMessage = async (ctx, next) => {
  if (ctx.message.text) await next();
  else ctx.reply("not valid input");
};

export const done = async (ctx) => {
  try {
    if (ctx.wizard.state.packages.length === 0)
      return await ctx.answerCbQuery("You must choose min. 1 Influencer!");

    await ctx.reply("Processing proposal...");
    delete ctx.wizard.state.infstmp;
    await createProposal(ctx.wizard.state, ctx.chat.id);

    ctx.session.proposals = await getProposals({
      consumer: ctx.session.consumer,
    });
    await ctx.reply(
      "Thanks for taken time, we will inform you as soon as possible :)"
    );
    await ctx.editMessageReplyMarkup(sentProposalButton().reply_markup);
    await ctx.answerCbQuery("Nicee!");

    return ctx.scene.leave();
  } catch (error) {
    throw error;
  }
};

export const influencerSelectionActions = async (ctx) => {
  const infID = ctx.callbackQuery.data.split(" ")[1];
  const pkgID = ctx.callbackQuery.data.split(" ")[2];

  if (pkgID) {
    ctx.wizard.state.packages = ctx.wizard.state.packages.filter(
      (pkg) => pkg != pkgID
    );
    // console.log('packge exist and id: ',pkgID)
    // console.log('packages: ', ctx.wizard.state.packages)
    await ctx.answerCbQuery("Package pulled out from proposal");
    return await ctx.editMessageText(
      activeInfluencerChooseListText(ctx.wizard.state.infstmp),
      influencerButtons(ctx.wizard.state.infstmp, ctx.wizard.state.packages)
    );
  }
  const inf = await getInfluencerByID(infID, { populate: true });
  await ctx.answerCbQuery();
  let text = `Choose from below packages: \n`;

  for (let pkg of inf.packages) {
    text = text.concat(
      `Name: ${pkg.name} - Detail: ${pkg.detail} - Price: ${pkg.price}\n`
    );
  }
  await ctx.editMessageText(text, packagesButtons(inf));
};

export const packageSelectionActions = async (ctx) => {
  const pkgID = ctx.callbackQuery.data.split(" ")[1];
  if (pkgID === "back")
    return await ctx.editMessageText(
      activeInfluencerChooseListText(ctx.wizard.state.infstmp),
      influencerButtons(ctx.wizard.state.infstmp, ctx.wizard.state.packages)
    );

  // const pkg = await getPackage(pkgID)
  ctx.answerCbQuery();
  ctx.wizard.state.packages.push(pkgID);
  ctx.editMessageText(
    activeInfluencerChooseListText(ctx.wizard.state.infstmp),
    influencerButtons(ctx.wizard.state.infstmp, ctx.wizard.state.packages)
  );
};
