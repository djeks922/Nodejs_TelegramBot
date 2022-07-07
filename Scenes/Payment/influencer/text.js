export const adminPaymentText = (transaction) => {
    return `NEW TRANSACTION FROM CONSUMER

Proposal token name: ${transaction.proposal.name}
For package: ${transaction.package.name}
TxID: ${transaction.txID}`;
  };