import {getInfluencers} from '../service/influencer.js'

export const get_influencers = async (req,res,next) => {
    try {
        const influencers = await getInfluencers({status: 'active'},{populate:true})
        res.send(influencers)
    } catch (error) {
        next(error)
    }
}