import bot from '../../config/bot.config.js'
import { createProposal } from "../service/proposal.js";


export const postProposal = async (req, res, next) => {
  try {
    console.log(req.files)
    const proposal = req.body
    const { queryID, consumerChatID } = req.query;
    const pImages = []
    for(let file of req.files){
        pImages.push(`${process.env.APITUNEL_URL}/${file.path.replace(/\\/g,"/")}`)
    }
    proposal.pImages = pImages
    const prop = await createProposal(req.body, consumerChatID);
    await bot.telegram.answerWebAppQuery(queryID, {
      type: "article",
      id: "id",
      title: "proposal",
      input_message_content: {
        message_text: `Proposal
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

Status: ${proposal.status}`,
      },

      // reply_markup?: InlineKeyboardMarkup;
    });
    res.send("nice");
  } catch (error) {
    next(error);
  }
};
