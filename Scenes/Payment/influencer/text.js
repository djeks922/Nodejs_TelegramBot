export const adminPaymentText = (transaction) => {
    return `NEW TRANSACTION FROM CONSUMER\nProposal token name: ${transaction.proposal.name}\nFor package: ${transaction.package.name}\nTxID: ${transaction.txID}`;
  };