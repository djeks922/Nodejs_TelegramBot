import { Markup } from "telegraf";
import { getPackageByFilter } from "../../api/service/influencer.js";
export const paymentButtons = (proposals) => {
  const payArr = [];
  // console.log(proposals)
  for (let proposal of proposals) {
    for (let inf of proposal.acceptedBy) {
      const pkg = proposal.packages.find(
        (pkg) => pkg.influencer._id.toString() === inf._id.toString()
      );

      const isPayedToAdmin = proposal.packagesPayedToAdmin.some(
        (pkgA) => pkgA._id.toString() === pkg._id.toString()
      );
      const isPayedToInfluencer = proposal.packagesPayedToInfluencer.some(
        (pkgI) => pkgI._id.toString() === pkg._id.toString()
      );

      // console.log({isPayedToAdmin},{isPayedToInfluencer})

      if (!isPayedToAdmin) {
        // console.log('should pay to admin')
        payArr.push([
          Markup.button.callback(
            `Pay for ${proposal.name}-${pkg.name}`,
            `oo ${proposal._id} ${pkg._id}`
          ),
        ]);
      }
      if (isPayedToAdmin && !isPayedToInfluencer) {
        // console.log('admin should pay to influencer')
        payArr.push([
          Markup.button.callback(
            `Verified✅ by admin ${proposal.name}-${pkg.name}`,
            `somernd ${proposal._id} ${pkg._id}`
          ),
        ]);
      }
      if (isPayedToAdmin && isPayedToInfluencer) {
        payArr.push([
          Markup.button.callback(
            `Verified✅ by admin&influencer ${proposal.name}-${pkg.name}`,
            `somernd ${proposal._id} ${pkg._id}`
          ),
        ]);
      }
    }
  }
  return Markup.inlineKeyboard(payArr).resize().oneTime();
};
