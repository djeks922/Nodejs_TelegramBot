import checkValidation from '../middlewares/checkValidation.js'
import proposalRoute from './proposal.js'
import influencerRoute from './influencer.js'

export default  (app) => {
    app.use('/api/validate',checkValidation)
    app.use('/api/influencer',influencerRoute)
    app.use('/api/proposal',proposalRoute)
}