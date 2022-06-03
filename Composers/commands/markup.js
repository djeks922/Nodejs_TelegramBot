import { Markup } from "telegraf";

export const paymentButtons = (proposals) => {
  const payArr = [];
  for (let proposal of proposals) {
    for (let pkg of proposal.packages) {
      if (pkg.paymentPhase === "ready-to-pay") {
        payArr.push([
          Markup.button.callback(
            `Pay for ${proposal.name}-${pkg.package.name}`,
            `oo ${proposal._id} ${pkg._id}`
          ),
        ]);
      }
      if (pkg.paymentPhase === "payed") {
        payArr.push([
          Markup.button.callback(
            `Verified✅ ${proposal.name}-${pkg.package.name}`,
            `somernd ${proposal._id} ${pkg._id}`
          ),
        ]);
      }
    }
  }
  return Markup.inlineKeyboard(payArr).resize().oneTime();
};
