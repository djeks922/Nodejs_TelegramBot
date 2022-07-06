export const influencerAcceptTransactionTextForCustomer = (transaction) => {
  const text = `Deal done for:\nProposal name: ${transaction.proposal.name}\nInfluencer: ${transaction.package.influencer.name}\nPackage: ${transaction.package.name}\nInfluencer will send post links as soon as they will be ready.`;
  return text;
};
export const influencerAcceptTransactionTextForAdmin = (transaction) => {
  const text = `Influencer verified transaction:\nProposal name: ${transaction.proposal.name}\nInfluencer: @${transaction.package.influencer.username}\nPackage: ${transaction.package.name}\nTxID: ${transaction.txID}`;
  return text;
};
export const influencerRejectsProposalToAdmin = (ctx,proposal) => {
  const text = `❌❌
Proposal token name: ${proposal.name}
Package name: ${
    proposal.rejectedForByI[proposal.rejectedForByI.length - 1].name
  } was rejected by Influencer: @${ctx.session.consumer.username}
❌❌`
  return text;
};
export const influencerRejectsProposalToConsumer = (ctx,proposal) => {
  const text = `❌❌
Proposal token name: ${proposal.name}
Package name: ${
    proposal.rejectedForByI[proposal.rejectedForByI.length - 1].name
  } was rejected by Influencer: ${ctx.session.consumer.name}
❌❌`
  return text;
};

export const postLinkInformation_reply = () => {
  return `When you are done with posts.
Enter /register, then click Received proposals. 
Find button to add post links for related proposal.`
}
