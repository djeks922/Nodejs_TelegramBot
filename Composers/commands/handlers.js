export const add = async (ctx) => {
  await ctx.scene.enter("consumer-scene-id");
};

export const register = async (ctx) => {
  await ctx.scene.enter("influencer-scene-id");
};

export const myproposals = async (ctx) => {
  ctx.session.proposals = await ctx.session.proposals;
  console.log("myproposals", ctx.session.proposals);
  let proposalText = `My proposals: \n`;
  if (ctx.session.proposals?.length === 0)
    return await ctx.reply("You do not have any proposal");
  for (let [i, proposal] of ctx.session.proposals?.entries()) {
    proposalText = proposalText.concat(
      `${i}.Token: ${proposal.name}\n  Contract address: ${
        proposal.contractAddress
      }\n  Description: ${proposal.description}\n  Developer: ${
        "@" + proposal.developerUsername
      }\n  Telegram: ${proposal.telegram}\n  Twitter: ${
        proposal.twitter
      }\n  Website: ${proposal.website}\n  Status: ${
        proposal.status
      }\n  Staged date : ${proposal.createdAt}\n`
    );
    let packagesText = `  Applied packages: \n`;
    for (let [i, pkg] of proposal.packages?.entries()) {
      console.log(pkg);
      packagesText = packagesText.concat(
        `    ${i}. Influencer: ${pkg.influencer.name}, Package: ${
          pkg.package.name + `(${pkg.package.price})`
        }\n`
      );
    }
    proposalText = proposalText.concat(packagesText);
    proposalText = proposalText.concat(
      "----------------------------------------\n"
    );
  }

  await ctx.reply(proposalText);
};
