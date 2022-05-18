import {Scenes} from 'telegraf'
import tokenInfo from './consumerProposal.js'
const {Stage} = Scenes

const stage = new Stage([tokenInfo])

export default stage