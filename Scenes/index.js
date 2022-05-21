import {Scenes, Composer, session} from 'telegraf'
import proposal from './Proposal/index.js'
import registry from './Registry/index.js'

const {Stage} = Scenes

const composer = new Composer()

const stage = new Stage([proposal,registry])

composer.use(session())
composer.use(stage.middleware())

export default composer