import logger from '../logger/index.js'
import Influencer from '../models/tg-influencer.js'

export const createInfluencer = async (influencer) => {
    try {
       const _influencer = await Influencer.findOneAndUpdate(influencer,{},{upsert:true})
     
       return _influencer
    } catch (error) {
        logger.error(error)
    }
}

export const getInfluencers = async (filter = {}) => {
    try {
       const influencer = await Influencer.find(filter).lean()

       return influencer
    } catch (error) {
        logger.error(error)
    }
}

export const getInfluencerByUserID = async (id) => {
    try {
       const influencer = await Influencer.findOne({userID: id}).lean()

       return influencer
    } catch (error) {
        logger.error(error)
    }
}

export const getInfluencerByChatID = async (id) => {
    try {
       const influencer = await Influencer.findOne({chatID: id}).lean()

       return influencer
    } catch (error) {
        logger.error(error)
    }
}
export const getAdmins = async () => {
    try {
       const influencer = await Influencer.findOne({isAdmin: true}).select({chatID: 1}).lean()

       return influencer
    } catch (error) {
        logger.error(error)
    }
}

export const deleteInfluencerByChatID = async (id) => {
    try {
       const influencer = await Influencer.deleteOne({chatID: id})

       return influencer
    } catch (error) {
        logger.error(error)
    }
}