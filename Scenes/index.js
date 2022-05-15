import {Scenes} from 'telegraf'
import consumer from './consumer.scene.js'
const {Stage} = Scenes

const stage = new Stage([consumer])

export default stage