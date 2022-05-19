import {Scenes} from 'telegraf'
import proposal from './consumerProposal.js'
import registry from './influencerRegistry.js'
const {Stage} = Scenes

const stage = new Stage([proposal,registry])

export default stage