import bot from "../../config/bot.config.js";
import logger from "../logger/index.js";

import { getInfluencerByID } from "../service/influencer.js";
import Influencer from '../models/tg-influencer.js'

import {adminButtons,updateProfile} from '../utils/registry/markup.js'
import {influencerRegistryText} from '../utils/registry/text.js'

const influencerListener = Influencer.watch();


influencerListener.on("change", async (data) => {
    try {
      if (data.operationType === "insert") {
        logger.info('Potentially NEW INFLUENCER' + JSON.stringify(data.fullDocument))
      }
      if (data.operationType === "update") {

        
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'inreview'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:true})
            // const admin = await getAdmins()
            bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, influencerRegistryText(_influencer), adminButtons(_influencer))
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'active'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:false})
            bot.telegram.sendMessage(_influencer.chatID,'Your account activated, good luck :)',updateProfile())
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'inactive'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:false})
            bot.telegram.sendMessage(_influencer.chatID,'Your account deactivated, come back when you feel ready :)',updateProfile())
        }
      }
    } catch (error) {
      throw error;
    }
});