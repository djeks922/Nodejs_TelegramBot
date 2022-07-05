import { Markup } from "telegraf";
import { getTransactionsByFilter } from "../../api/service/transaction.js";
export const paymentButtons = async (proposals) => {
  const payArr = [];
  // console.log(proposals)
  for (let proposal of proposals) {
    for (let inf of proposal.acceptedBy) {
      const pkg = proposal.packages.find(
        (pkg) => pkg.influencer._id.toString() === inf._id.toString()
      );
      const transaction = await getTransactionsByFilter({
        package: pkg,
        proposal: proposal,
      });

      if (transaction.length === 0 || !transaction) {
        // console.log('should pay to admin')
        payArr.push([
          Markup.button.callback(
            `Pay for ${proposal.name}-${pkg.name}`,
            `oo ${proposal._id} ${pkg._id}`
          ),
        ]);
      } else {
        if (
          transaction &&
          transaction[0].status === "VERIFIED-admin" &&
          transaction[1]?.status !== "VERIFIED-influencer"
        ) {
          // console.log('admin should pay to influencer')
          payArr.push([
            Markup.button.callback(
              `Verified✅ by admin ${proposal.name}-${pkg.name}`,
              `somernd ${proposal._id} ${pkg._id}`
            ),
          ]);
        }
        if (
          transaction &&
          transaction[0].status === "VERIFIED-admin" &&
          transaction[1]?.status === "VERIFIED-influencer"
        ) {
          payArr.push([
            Markup.button.callback(
              `Verified✅ by admin&influencer ${proposal.name}-${pkg.name}`,
              `somernd ${proposal._id} ${pkg._id}`
            ),
          ]);
        }

        if (transaction && transaction[0].status === "REJECTED-admin") {
          payArr.push([
            Markup.button.callback(
              `Rejected❌|Repay ${proposal.name}-${pkg.name}`,
              `rsT ${transaction[0]._id}`
            ),
          ]);
        }
      }
    }
  }
  return Markup.inlineKeyboard(payArr).resize().oneTime();
};

export const webapp_opener = () => {
  return Markup.inlineKeyboard([[Markup.button.webApp('Create proposal',process.env.WEBAPP_URL)]]).resize()
}
