import { Markup } from "telegraf";

export const registryButtons = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Social", "1"),
      Markup.button.callback("Package", "2"),
      Markup.button.callback("Requirement", "3"),
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
      Markup.button.callback("Deactive", "9"),
      Markup.button.callback("Activate", "10"),
    ],
    [
      Markup.button.callback("View Profile", "5"),
      Markup.button.callback("save&leave", "6"),
    ],
    [
      Markup.button.callback('DELETE ACCOUNT', 'deleteinfluenceraccaunt')
    ]
  ]).resize(false);
};

export const deleteVerifyButtons = () => {
  return Markup.inlineKeyboard([
    Markup.button.callback('Sure', 'Delete Sure'),
    Markup.button.callback('Cancel', 'Delete Cancel')
  ])
}
// export const updateButtons = () => {
//   return Markup.inlineKeyboard([
//     [
//       Markup.button.callback("Social", "1"),
//       Markup.button.callback("Package", "2"),
//     ],
//     [
//       Markup.button.callback("Requirement", "3"),
//       Markup.button.callback("Wallet address", "4"),
//     ],
//     [
//       Markup.button.callback("Reapply", "10"),
//       Markup.button.callback("save&leave", "6")
//     ]
//   ]).resize(false);
// };

export const backToRegistryButtons = () => {
  return Markup.keyboard([["Back to registry"]])
    .resize()
    .oneTime();
};
