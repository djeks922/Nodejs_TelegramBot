import { Markup } from "telegraf";

export const adminButtons = (proposal, admin) => {
  const approvedForButtons = approveInfluencersButtons(
    proposal.packages,
    proposal._id
  );

  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Approve all", `aa ${proposal._id}`),
      Markup.button.callback("Reject all", `ra ${proposal._id}`),
    ],
    ...approvedForButtons,
  ])
    .oneTime()
    .resize();
};

export const approveInfluencersButtons = (packages, pID) => {
  const callbackArr = [];
  

  for (const pkg of packages) {
    callbackArr.push([
      Markup.button.callback(
        `Approve ${pkg.influencer.username}`,
        `aai ${pID} ${pkg.influencer._id}`
      ),
      Markup.button.callback(
        `Reject ${pkg.influencer.username}`,
        `rai ${pID} ${pkg.influencer._id}`
      ),
    ]);
  }

  return callbackArr;
};

export const influencerButtons = (proposal, inf) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("accept", `ai ${proposal._id} ${inf._id}`),
    Markup.button.callback("reject", `ri ${proposal._id} ${inf._id}`),
  ])
    .oneTime()
    .resize();
};

export const updateProposal = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Update proposal", "updateProposal"),
  ]);
};
