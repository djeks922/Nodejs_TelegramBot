

export const adminRejectsTransactionText = (transaction) => {
  let text = `Your transaction rejected by admin, the reasons could be you miss entered the txID or it's invalid:

Transaction txID: ${transaction.txID}
Transaction proposal: ${transaction.proposal.name}
Transaction package: ${transaction.package.name}`;

  return text
};


export const rejectIndividualConsumerText = (proposal,pkg) => {
  let text = `Your Proposal: ${proposal.name} was rejected by admin for Package: ${pkg.name}`
  return text
}

export const consumerTransactionNText = (tr) => {
  return `Your Transaction verified by admin for: \nToken: ${tr.proposal.name}\nPackage: ${tr.package.name}\n\nYou will receive posts' links when influencer share your project on his(her) platforms.`;
};