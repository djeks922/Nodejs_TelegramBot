export const influencerAcceptTransactionTextForCustomer = (transaction) => {
  const text = `Deal done for:\nProposal name: ${transaction.proposal.name}\nInfluencer: ${transaction.package.influencer.username}\nPackage: ${transaction.package.name}`;
  return text;
};
export const influencerAcceptTransactionTextForAdmin = (transaction) => {
  const text = `Influencer verified transaction:\nProposal name: ${transaction.proposal.name}\nInfluencer: ${transaction.package.influencer.username}\nPackage: ${transaction.package.name}\nTxID: ${transaction.txID}`;
  return text;
};
