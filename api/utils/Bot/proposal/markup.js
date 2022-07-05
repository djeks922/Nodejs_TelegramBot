import { Markup } from "telegraf";

export const adminButtons = (proposal,all = 0) => {
  const approvedForButtons = approveInfluencersButtons(proposal);
  const btns = []
  !all ? btns.push([
    Markup.button.callback("Approve all", `aa ${proposal._id}`),
    Markup.button.callback("Reject all", `ra ${proposal._id}`),
  ]) : ''
  btns.push(...approvedForButtons)
  return Markup.inlineKeyboard(btns)
    .oneTime()
    .resize();
};
export const adminButtonsApproved = (proposal) => {
  
  return Markup.inlineKeyboard([
    Markup.button.callback("Approved for all✅", `aa ${proposal._id}`),
    Markup.button.callback("Reject even tho?❌", `ra ${proposal._id}`),
  ])
    .oneTime()
    .resize();
};
export const adminButtonsRejected = (proposal) => {
  
  return Markup.inlineKeyboard([
    Markup.button.callback("Rejected❌", `ra ${proposal._id}`),
  ])
    .oneTime()
    .resize();
};

export const approveInfluencersButtons = (proposal) => {
  const callbackArr = [];
  // console.log(proposal,{proposalrejectedfor: proposal.rejectedFor})
  for (const pkg of proposal.packages) {
    if (
      proposal.rejectedFor.some(
        (pkgR) => pkg._id.toString() === pkgR.toString()
      )
    ) {
      callbackArr.push([
        Markup.button.callback(
          `Rejected❌ @${pkg.influencer.username}`,
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
          `Approved✅ @${pkg.influencer.username}`,
          `askjdqwk ${proposal._id} ${pkg.influencer._id}`
        )
      ]);
    } else {
      callbackArr.push([
        Markup.button.callback(
          `Approve @${pkg.influencer.username}`,
          `aai ${proposal._id} ${pkg.influencer._id}`
        ),
        Markup.button.callback(
          `Reject @${pkg.influencer.username}`,
          `rai ${proposal._id} ${pkg.influencer._id}`
        ),
      ]);
    }
  }

  return callbackArr;
};

export const influencerButtons = (proposal, pkg) => {
  return Markup.inlineKeyboard([
    Markup.button.callback("accept", `ai ${proposal._id} ${pkg.influencer._id}`),
    Markup.button.callback("reject", `ri ${proposal._id} ${pkg._id}`),
  ])
    .oneTime()
    .resize();
};

export const updateProposal = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Update proposal", "updateProposal"),
  ]);
};
