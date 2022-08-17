import bot from "../../config/bot.config.js";
import { createProposal } from "../service/proposal.js";

export const postProposal = async (req, res, next) => {
  try {
    // console.log(req.files)
    const proposal = req.body;
    const { queryID, consumerChatID } = req.query;
    // console.log({proposal,queryID,consumerChatID})
    if (!queryID || !consumerChatID) {
      return res.status(400).send({ message: "Bad request" });
    }
    if (req.files) {
      const pImages = [];
      for (let file of req.files) {
        pImages.push(
          `${process.env.APITUNEL_URL}/${file.path.replace(/\\/g, "/")}`
        );
      }
      proposal.pImages = pImages;
    }
    proposal.packages = proposal.packages.split(",");
    // console.log(proposal.packages);
    const webappData = JSON.parse(proposal.filtered)
    delete proposal.filtered

    const prop = await createProposal(proposal, consumerChatID);
    
    let webappDataText = `Packages: \n`
    let totalPrice = 0
    for(let el of webappData){
      totalPrice += parseInt(el.package.price)
      webappDataText+= `Influencer: ${el.influencer.name}
Package: ${el.package.name}
Price: ${el.package.price}\n`
    }
    webappDataText+=`Total Price: ${totalPrice}`
    /** ANSWERING WEBAPP QUERY TO CLOSE THE APP */
    await bot.telegram.answerWebAppQuery(queryID, {
      type: "article",
      id: Math.random().toString(),
      title: "proposal",
      input_message_content: {
        message_text: `Proposal Submited!
Name: ${proposal.name}
Website: ${proposal.website}
ContractAddress: ${proposal.contractAddress}
Telegram: ${proposal.telegram}
Developer Username: @${proposal.developerUsername}
Twitter: ${proposal.twitter}
Description: 
    ${proposal.description}
Additional Info: 
    ${proposal.additionalInfo}
${webappDataText}`,
        disable_web_page_preview: true,
      },

      // reply_markup?: InlineKeyboardMarkup;
      // thumb_url: proposal.pImages && proposal.pImages[0],
      // thumb_width: 50,
      // thumb_height: 50,
    });
    // console.log(proposal.pImages)
    if (proposal.pImages && proposal.pImages.length >= 1) {
      console.log(proposal.pImages,'IMAGES INCLUDES IN PROPOSAL')
      const mediaArr = [];
      for (let imgFile of proposal.pImages) {
        mediaArr.push({
          type: "photo",
          media: imgFile,
        });
      }
      await bot.telegram.sendMessage(consumerChatID,'Proposal Images: ')
      const mediaSentInfo = await bot.telegram.sendMediaGroup(consumerChatID, mediaArr);
      // console.log(mediaSentInfo)
    }

    res.send("nice");
  } catch (error) {
    next(error);
  }
};
