import { Markup } from "telegraf";

export const leaveButton = () => {
  return Markup.inlineKeyboard([Markup.button.callback("leave", "ps leave")]);
};

export const leaveButtonEdited = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback("leaved", "ps leaved")],
  ]);
};

export const influencerButtons = (influencers, packages) => {
  const callbackArr = [];
  let counter = 0;
  for (const inf of influencers) {
    let name;
    let pkg = packages.find((pkgSelected) =>
      inf.packages.some(
        (pkgInfluencer) =>
          pkgInfluencer._id.toString() === pkgSelected.toString()
      )
    );
    // console.log(pkg)
    if (pkg && pkg.length) {
      name = `${inf.name}✅`;
      callbackArr.push(Markup.button.callback(name, `ps ${inf._id} ${pkg}`));
    } else {
      name = inf.name;
      callbackArr.push(Markup.button.callback(name, `ps ${inf._id}`));
    }

    counter++;
  }

  return Markup.inlineKeyboard([
    callbackArr,
    [Markup.button.callback("done", "ps done")],
  ]);
};
export const packagesButtons = (influencer) => {
  const callbackArr = [];

  for (const pkg of influencer.packages) {
    callbackArr.push(Markup.button.callback(`${pkg.name}`, `pp ${pkg._id}`));
  }

  return Markup.inlineKeyboard([
    callbackArr,
    [Markup.button.callback(`Go Back`, "pp back")],
  ]);
};

export const sentProposalButton = () => {
  return Markup.inlineKeyboard([Markup.button.callback("sent", "ps sent")]);
};
