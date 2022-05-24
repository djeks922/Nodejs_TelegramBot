export const proposalToInfluencer = (proposal) => {
  return `NEW PROMO REQUEST\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt} `;
};

export const proposalToAdmin = (proposal) => {
  let text = `NEW PROMO REQUEST\nName: ${proposal.name}\nContract address: ${proposal.contractAddress}\nWebsite: ${proposal.website}\n\n\nDescription: ${proposal.description}\n\nDev: @${proposal.developerUsername}\npost time: ${proposal.createdAt} `;
  
  text = text.concat('\n\n\nFor Influencers:\n')

  for (const [i,inf] of proposal.influencers.entries()) {
    text = text.concat(`\n${i}: ${'@'+inf.username}`)
  }

  return text;
};

export const approveNotificationToConsumer = (proposal) => {
  return `Your proposal for token: '${proposal.name}' was approved by Cryptoencer team for all influencers, waiting for influencers' response :)`;
};

export const approveNotificationToConsumerI = (proposal, influencer) => {
  return `Your proposal for token: '${proposal.name}' was approved by Cryptoencer team to Influencer: ${influencer.username}, waiting for influencer response :)`;
};

export const acceptNotificationToConsumer = (proposal) => {
  return `Your proposal for token ${proposal.name} is accepted by ${
    proposal.acceptedBy[proposal.acceptedBy.length - 1].username
  }`;
};

export const acceptNotification_admin = (proposal) => {
  return `Influencer ${
    proposal.acceptedBy[proposal.acceptedBy.length - 1].username
  } accepted the Proposal for Token ${proposal.name} of Consumer ${
    proposal.consumer.username
  }`;
};
