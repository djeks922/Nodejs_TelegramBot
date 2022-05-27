import {Scenes, Composer, session} from 'telegraf'
import proposal from './Proposal/index.js'
import registry,{socialScene,packageScene} from './Registry/index.js'

const {Stage} = Scenes

const composer = new Composer()

const stage = new Stage([proposal,registry,socialScene,packageScene])

composer.use(session())
composer.use(stage.middleware())

export default composer