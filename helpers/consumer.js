export const consumerPaymentText = (ctx, proposal, pkg) => {
  return `NEW TRANSACTION FROM CONSUMER: @${ctx.message.from.username}\nProposal token name: ${proposal.name}\n For Influencer: @${pkg.influencer.username}\n For package: ${pkg.package.name}\n TaxID: ${ctx.message.text}\n`;
};
