export const activeInfluencerChooseList = (influencers) => {
  let text = `Choose Influencers with whom you want to proceed promotion, after selection the packages of that influencer will appear: \n`;

  // for (let [i,influencer] of influencers.entries()) {
  //     text = text.concat(`<b>${i}</b>. ${influencer.name} \n`)
  //     let packageText = `    Packages: \n`
  //     for (let [i,pkg] of influencer.packages.entries()) {
  //         packageText = packageText.concat(`      <b>${i}</b>. Name: ${pkg.name}, Detail: ${pkg.detail}, Price: ${pkg.price}\n`)
  //     }
  //     text = text.concat(`${packageText}    Requirement: ${influencer.requirement}\n---------------------------------------\`)
  // }

  return text;
};

export const registryText = (ctx) => {
  return `Hi again, ${
    ctx.message ? ctx.message.from.first_name : ""
  }\nAdd account details, packages and socials. (Apply for review when you are done with your packages and social accaunts)`;
};
export const accountText = (ctx, status) => {
  return `My account - status: ${status}`;
};
