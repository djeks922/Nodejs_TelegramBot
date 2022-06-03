import {Scenes, Composer, session} from 'telegraf'
import proposal from './Proposal/index.js'
import registry,{socialScene,packageScene,walletScene,requirementScene} from './Registry/index.js'
import payment from './Payment/index.js'

const {Stage} = Scenes

const composer = new Composer()

const stage = new Stage([proposal,registry,socialScene,packageScene,walletScene,requirementScene,payment.paymentToAdmin,payment.paymentToInfluencer])

composer.use(session())
composer.use(stage.middleware())

export default composer