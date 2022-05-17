import {Scenes} from 'telegraf'
import tokenInfo from './consumerToken.js'
const {Stage} = Scenes

const stage = new Stage([tokenInfo])

export default stage