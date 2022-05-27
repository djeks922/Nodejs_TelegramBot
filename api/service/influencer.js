import logger from '../logger/index.js'
import Influencer from '../models/tg-influencer.js'
import Social from '../models/tg-social.js'
import Package from '../models/tg-package.js'


// Influencer CRUD
export const createOrUpdateInfluencer = async (influencer, updates = {}) => {
    try {
       const _influencer = await Influencer.findOneAndUpdate(influencer,updates,{new: true,upsert:true})
     
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
       const influencer = await Influencer.findOne({userID: id}).populate('tg-social').populate('tg-package').lean()

       return influencer
    } catch (error) {
        logger.error(error)
    }
}

export const getInfluencerByChatID = async (id) => {
    try {
       const influencer = await Influencer.findOne({chatID: id}).populate('tg-social').populate('tg-package').lean()

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

// Social CRUD

export const createSocial = async (infID,social) => {
    try {
        const _social = await Social.findOneAndUpdate(social,{}, {new:true,upsert: true})
        console.log(_social, infID)
        const inf = await Influencer.updateOne({_id: infID}, {$addToSet: {socials: _social._id}})
        console.log(inf)
    } catch (error) {
        throw error
    }
}

export const updateSocial = async (id, updates) => {
    try {
        const social = await Social.updateOne({_id: id}, updates)

        return social
    } catch (error) {
        throw error
    }
}
export const deleteSocial = async (infID,id) => {
    try {
        const social = await Social.deleteOne({_id: id})

        social.deletedCount ?  await Influencer.updateOne({_id: infID}, {$pull: {socials: id}}) : undefined
       
        return social
    } catch (error) {
        throw error
    }
}
export const getSocial = async (id) => {
    try {
        const social = await Social.findById(id)

        return social
    } catch (error) {
        throw error
    }
}

// Package CRUD

export const createPackage = async (infID,pkg) => {
    try {
        const _pkg = await Package.findOneAndUpdate(pkg,{}, {new:true,upsert: true})
        
        await Influencer.updateOne({_id: infID}, {$addToSet: {packages: _pkg._id}})
    } catch (error) {
        throw error
    }
}

export const updatePackage = async (id, updates) => {
    try {
        const pkg = await Package.updateOne({_id: id}, updates)

        return pkg
    } catch (error) {
        throw error
    }
}
export const deletePackage = async (id) => {
    try {
        const pkg = await Package.deleteOne({_id: id})

        return pkg
    } catch (error) {
        throw error
    }
}
export const getPackage = async (id) => {
    try {
        const pkg = await Package.findById(id)

        return pkg
    } catch (error) {
        throw error
    }
}

