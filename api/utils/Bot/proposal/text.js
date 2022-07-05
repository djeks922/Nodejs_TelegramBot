export const proposalToInfluencer = (proposal,pkg) => {
  return `NEW PROMO REQUEST\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt}\n\nFor package: ${pkg.name}`;
};

export const proposalToAdmin = (proposal) => {
  let text = `NEW PROMO REQUEST:\nchatID: ${proposal.consumer.chatID}\nUsername: @${proposal.consumer.username}\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt} `;
  
  text = text.concat('\n\n\nFor Influencers:\n')

  for (const [i,pkg] of proposal.packages.entries()) {
    text = text.concat(`\n@${pkg.influencer.username}: ${pkg.name}`)
  }

  return text;
};

export const approveNotificationToConsumer = (proposal) => {
  return `Your proposal for token: '${proposal.name}' was approved by Cryptoencer team for all influencers, waiting for influencers' response :)`;
};

export const approveNotificationToConsumerI = (proposal, influencer) => {
  return `Your proposal for token: '${proposal.name}' was approved by Cryptoencer team and redirected to Influencer: ${influencer.name}, waiting for influencer response :)`;
};

export const acceptNotificationToConsumer = (proposal) => {
  return `Your proposal for token ${proposal.name} is accepted by ${
    proposal.acceptedBy[proposal.acceptedBy.length - 1].name
  }, update proposals and move to /myproposals and make the payment for promotion.`;
};

export const acceptNotification_admin = (proposal) => {
  return `Influencer @${
    proposal.acceptedBy[proposal.acceptedBy.length - 1].username
  } accepted the Proposal for Token ${proposal.name} of Consumer @${
    proposal.consumer.username
  }`;
};
