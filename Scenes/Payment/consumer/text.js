export const consumerPaymentText = (ctx, proposal, pkg) => {
    return `NEW TRANSACTION FROM CONSUMER: @${ctx.message.from.username}\nProposal token name: ${proposal.name}\n For Influencer: @${pkg.influencer.username}(wallet address: ${pkg.influencer.wallet})\n For package: ${pkg.name}(${pkg.price})\n TxID: ${ctx.message.text}\n`;
  };
  export const consumerRePaymentText = (ctx, transaction) => {
    return `TRANSACTION REPAYMENT AFTER REJECTION FROM CONSUMER: @${ctx.message.from.username}\nProposal token name: ${transaction.proposal.name}\n For Influencer: @${transaction.package.influencer.username}(wallet address: ${transaction.package.influencer.wallet})\n For package: ${transaction.package.name}(${transaction.package.price})\n TxID: ${ctx.message.text}\n`;
  };