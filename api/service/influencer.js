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
        throw error
    }
}

export const updateInfluencer = async (id, updates = {}) => {
    try {
        const updateInfo = await Influencer.updateOne({_id: id}, updates,{timestamps: false})

        return updateInfo
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getInfluencers = async (filter = {}, {lean =  true, populate = false}, options = {}) => {
    try {
        const influencer = lean
        ? populate
          ? await Influencer.find(filter,{},options)
              .populate("socials")
              .populate('packages')
              .lean()
          : await Influencer.find(filter,{},options).lean()
        : populate
        ? await Influencer.find(filter,{},options)
              .populate("socials")
              .populate('packages')
        : await Influencer.find(filter,{},options);
  
         return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getInfluencerByID = async (id, {lean = true,populate = false}) => {
    try {
        // console.log(lean,populate)
        const influencer = lean
        ? populate
          ? await Influencer.findOne({ _id: id })
              .populate("socials")
              .populate('packages')
              .lean()
          : await Influencer.findOne({ _id: id }).lean()
        : populate
        ? await Influencer.findOne({ _id: id })
              .populate("socials")
              .populate('packages')
        : await Influencer.findOne({ _id: id });
  
         return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const getInfluencerByUserID = async (id, {lean = true,populate = false}) => {
    try {
        const influencer = lean
        ? populate
          ? await Influencer.findOne({ userID: id })
              .populate("socials")
              .populate('packages')
              .lean()
          : await Influencer.findOne({ userID: id }).lean()
        : populate
        ? await Influencer.findOne({ userID: id })
              .populate("socials")
              .populate('packages')
        : await Influencer.findOne({ userID: id });
  
         return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getInfluencerByChatID = async (id,{lean = true,populate = false}) => {
    try {
        const influencer = lean
      ? populate
        ? await Influencer.findOne({ chatID: id })
            .populate("socials")
            .populate('packages')
            .lean()
        : await Influencer.findOne({ chatID: id }).lean()
      : populate
      ? await Influencer.findOne({ chatID: id })
            .populate("socials")
            .populate('packages')
      : await Influencer.findOne({ chatID: id });

       return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const getInfluencerByUsername = async (username,{lean = true,populate = false}) => {
    try {
        const influencer = lean
      ? populate
        ? await Influencer.findOne({ username: { $regex: username, $options: 'gi' } })
            .populate("socials")
            .populate('packages')
            .lean()
        : await Influencer.findOne({ username: { $regex: username, $options: 'gi' } }).lean()
      : populate
      ? await Influencer.findOne({ username: { $regex: username, $options: 'gi' } })
            .populate("socials")
            .populate('packages')
      : await Influencer.findOne({ username: { $regex: username, $options: 'gi' } });

       return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const deleteInfluencerByChatID = async (id) => {
    try {
       const influencer = await Influencer.deleteOne({chatID: id})

       return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const deleteInfluencerByID = async (id) => {
    try {
       const influencer = await Influencer.findByIdAndDelete(id)

       return influencer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const getInfluencerCount = async (query) => {
    try {
       const influencerCount = await Influencer.countDocuments(query)

       return influencerCount
    } catch (error) {
        logger.error(error)
        throw error
    }
}

// Social CRUD

export const createSocial = async (infID,social) => {
    try {
        const _social = await Social.create(social)
   

       return _social
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

export const createPackage = async (pkg) => {
    try {
        const _pkg = await Package.create(pkg)

        await  _pkg.save()
        
        return _pkg
        // await Influencer.updateOne({_id: infID}, {$addToSet: {packages: _pkg._id}})
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
export const getPackageByFilter = async (filter = {}) => {
    try {
        const pkg = await Package.findOne(filter).populate('influencer')

        return pkg
    } catch (error) {
        throw error
    }
}

