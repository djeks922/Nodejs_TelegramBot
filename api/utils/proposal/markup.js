import { Markup } from "telegraf";

export const adminButtons = (proposal) => {
  const approvedForButtons = approveInfluencersButtons(proposal);

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

export const approveInfluencersButtons = (proposal) => {
  const callbackArr = [];

  for (const pkg of proposal.packages) {
    if (
      proposal.rejectedFor.some(
        (pkgID) => pkg._id.toString() === pkgID.toString()
      )
    ) {
      callbackArr.push([
        Markup.button.callback(
          `Rejected❌ ${pkg.influencer.username}`,
          `jkgtk ${proposal._id} ${pkg.influencer._id}`
        )
      ]);
    } else if (
      proposal.approvedFor.some(
        (inf) => inf._id.toString() === pkg.influencer._id.toString()
      )
    ) {
      callbackArr.push([
        Markup.button.callback(
          `Approved✅ ${pkg.influencer.username}`,
          `askjdqwk ${proposal._id} ${pkg.influencer._id}`
        )
      ]);
    } else {
      callbackArr.push([
        Markup.button.callback(
          `Approve ${pkg.influencer.username}`,
          `aai ${proposal._id} ${pkg.influencer._id}`
        ),
        Markup.button.callback(
          `Reject ${pkg.influencer.username}`,
          `rai ${proposal._id} ${pkg.influencer._id}`
        ),
      ]);
    }
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
