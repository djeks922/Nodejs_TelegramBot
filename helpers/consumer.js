export const consumerPaymentText = (ctx, proposal, pkg) => {
  return `NEW TRANSACTION FROM CONSUMER: @${ctx.message.from.username}\nProposal token name: ${proposal.name}\n For Influencer: @${pkg.influencer.username}\n For package: ${pkg.package.name}(${pkg.package.price})\n TxID: ${ctx.message.text}\n`;
};
export const consumerTransactionNText = (tr) => {
  return `Your Transaction verified for \n Token: ${tr.proposal.name}\n Package: ${tr.FOR.package.name}\n\n Some text about Influencer part when admin should send money to influencer then notify consumer about it.`
};

export const adminPaymentText =  (transaction) => {
  return `NEW TRANSACTION FROM CONSUMER: @${transaction.from.username}\nProposal token name: ${transaction.proposal.name}\nFor package: ${transaction.FOR.package.name}\nTxID: ${transaction.txID}`
}
