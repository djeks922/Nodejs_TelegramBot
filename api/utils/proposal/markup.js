import { Markup } from "telegraf";

export const adminButtons = (proposal, admin) => {

  const approvedForButtons = approveInfluencersButtons(proposal.packages, proposal._id, admin._id)

  return Markup.inlineKeyboard([[
    Markup.button.callback(
      "approve",
      `aa ${proposal._id} ${admin._id}`
    ),
    Markup.button.callback(
      "reject",
      `ra ${proposal._id} ${admin._id}`
    ),
  ],approvedForButtons])
    .oneTime()
    .resize();
};

export const approveInfluencersButtons = (packages,pID,aID) => {
  const callbackArr = [];
  let counter = 0;

  for (const pkg of packages) {
    callbackArr.push(Markup.button.callback(`${counter}.approve for ${pkg.influencer.username}`,`aai ${pID} ${pkg.influencer._id}`));
    counter++;
  }

  return callbackArr
};

export const influencerButtons = (proposal, inf) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("accept", `ai ${proposal._id} ${inf._id}`),
    Markup.button.callback("reject", `ri ${proposal._id} ${inf._id}`),
  ])
    .oneTime()
    .resize();
};
