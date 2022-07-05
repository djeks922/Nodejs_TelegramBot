import bot from "../../config/bot.config.js";
import logger from "../logger/index.js";
// import axios from "axios";
// import fs from 'fs'

import { getInfluencerByID } from "../service/influencer.js";
import Influencer from '../models/tg-influencer.js'

import {adminButtons,updateProfile} from '../utils/Bot/registry/markup.js'
import {influencerRegistryText} from '../utils/Bot/registry/text.js'

import FormData from 'form-data'
import checkFileExist from "../../helpers/checkFileExist.js";

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
            const exist = await checkFileExist(_influencer.avatar)
            exist ? await bot.telegram.sendPhoto(process.env.ADMIN_CHAT_ID,{source: _influencer.avatar}) : ''
            bot.telegram.sendMessage(process.env.ADMIN_CHAT_ID, influencerRegistryText(_influencer), adminButtons(_influencer))
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'active'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:true})
            console.log(data.updateDescription.updatedFields)
            bot.telegram.sendMessage(_influencer.chatID,'Your account activated, good luck :)',updateProfile())
            //
            // const form = new FormData()
            // form.append('name',_influencer.name)
            // form.append('requirements',_influencer.requirement)
            // form.append('volume','MEDIUM')
            // const exist = await checkFileExist(_influencer.avatar)
            // exist ? form.append('avatarImage',fs.createReadStream(_influencer.avatar)): ''
            // //
            // const res = await axios.post(
            //   'http://localhost:3001/api/internal/influencer/',
            //   form,
            //   {
            //     headers: {
            //       "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU5MDM3NDh9.8__ByfMv9c6zi1A1OJLgjT94W2TN1XRq1rYU1hl5k-o',
            //       "Content-Type": "multipart/form-data",
            //     }
            //   }
            // )
            // // console.log(webInfluencer)
            // for (let social of _influencer.socials){
            //   await axios.post(
            //     `http://localhost:3001/api/internal/social/${res.data._id}`,
            //     {
            //       link:social.url,
            //       platform: social.platform 
            //     },
            //     {
            //       headers: {
            //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTU5MDM3NDh9.8__ByfMv9c6zi1A1OJLgjT94W2TN1XRq1rYU1hl5k-o'
            //       }
            //     }
            //   )
            // }
        }
        if(data.updateDescription.updatedFields.status !== null && data.updateDescription.updatedFields.status === 'inactive'){
            const _influencer  = await getInfluencerByID(data.documentKey._id,{lean: true,populate:false})
            bot.telegram.sendMessage(_influencer.chatID,'Your account deactivated, come back when you feel ready :)',updateProfile())
        }
      }
    } catch (error) {
      // console.log(error.message)
      throw error;
    }
});