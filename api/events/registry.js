import bot from "../../config/bot.config.js";
import { getAdmins } from "../service/consumer.js";
import { getInfluencerByID } from "../service/influencer.js";
import Influencer from '../models/tg-influencer.js'

import {adminButtons} from '../utils/registry/markup.js'
import {influencerRegistryText} from '../utils/registry/text.js'

const influencerListener = Influencer.watch();


influencerListener.on("change", async (data) => {
    try {
      if (data.operationType === "insert") {
        // console.log(data,'new registry')
      }
      if (data.operationType === "update") {
        // console.log(data, 'update')
        
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'inreview'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:true})
            const admin = await getAdmins()
            bot.telegram.sendMessage(admin.chatID, influencerRegistryText(_influencer), adminButtons(_influencer))
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'active'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:false})
            bot.telegram.sendMessage(_influencer.chatID,'Your registration approved by admin, good luck :)')
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'inactive'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:false})
            bot.telegram.sendMessage(_influencer.chatID,'Your account deactivated')
        }
      }
    } catch (error) {
      throw error;
    }
});