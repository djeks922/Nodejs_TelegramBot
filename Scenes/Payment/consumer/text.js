export const consumerPaymentText = (ctx, proposal, pkg) => {
    return `NEW TRANSACTION FROM CONSUMER: @${ctx.message.from.username}

Proposal token name: ${proposal.name}
For Influencer: @${pkg.influencer.username}
Wallet address of @${pkg.influencer.username}: ${pkg.influencer.wallet}
For package: ${pkg.name}(${pkg.price})
TxID: ${ctx.message.text}`;
  };
  export const consumerRePaymentText = (ctx, transaction) => {
    return `TRANSACTION REPAYMENT AFTER REJECTION FROM CONSUMER: @${ctx.message.from.username}
    
Proposal token name: ${transaction.proposal.name}
For Influencer: @${transaction.package.influencer.username}
Wallet address: ${transaction.package.influencer.wallet})
For package: ${transaction.package.name}
Package price: (${transaction.package.price})
TxID: ${ctx.message.text}`;
  };