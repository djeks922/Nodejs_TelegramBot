

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