import { Markup } from "telegraf";

export const registryButtons = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Social", "1"),
      Markup.button.callback("Package", "2"),
      Markup.button.callback("Requirement", "3"),
      Markup.button.callback("Avatar", "12"),
    ],
    [
      Markup.button.callback("Wallet address", "4"),
      Markup.button.callback("View profile", "5"),
    ],
    [
      Markup.button.callback("Apply for review", "7"),
      Markup.button.callback("save&leave", "6"),
    ],
  ]).resize(false);
};
export const accountButtons = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Deactive", "8"),
      Markup.button.callback("Activate", "9"),
    ],
    [
      Markup.button.callback("View Profile", "5"),
      Markup.button.callback("save&leave", "6"),
    ],
    [
      Markup.button.callback("Received proposals", "10"),
      Markup.button.callback("Received payments", "11"),
    ],
    [Markup.button.callback("DELETE ACCOUNT", "deleteinfluenceraccaunt")],
  ]).resize(false);
};

export const deleteVerifyButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback("Sure", "Delete Sure"),
    Markup.button.callback("Cancel", "Delete Cancel"),
  ]);
};
export const postLinkButtons = (proposals) => {
  const arr = []
  for(let prop of proposals){
    arr.push([Markup.button.callback(`Links for ${prop.name}`, `link ${prop._id}`)])
  }
  return Markup.inlineKeyboard(...arr)
};

export const backToRegistryButtons = () => {
  return Markup.keyboard([["Back to registry"]])
    .resize()
    .oneTime();
};
export const exitOrLeaveButton = () => {
  return Markup.keyboard([["exit"]])
    .resize()
    .oneTime();
};
export const removeKeyboard = () => {
  return Markup.removeKeyboard()
};
