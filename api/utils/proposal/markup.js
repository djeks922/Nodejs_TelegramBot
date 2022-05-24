import { Markup } from "telegraf";

export const adminButtons = (proposal, admin) => {

  const approvedForButtons = approveInfluencersButtons(proposal.influencers, proposal._id, admin._id)

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

export const approveInfluencersButtons = (influencers,pID,aID) => {
  const callbackArr = [];
  let counter = 0;

  for (const inf of influencers) {
    callbackArr.push(Markup.button.callback(`${counter}.approve for ${inf.username}`,`aai ${pID} ${inf._id}`));
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
