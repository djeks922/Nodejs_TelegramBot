import {Composer} from 'telegraf'
import {updateProposalByID} from '../../api/service/proposal.js'
const composer = new Composer()

// Add actions
composer.action('accept', (ctx) => {
    console.log(ctx)
    ctx.answerCbQuery('accepted')
})
composer.action('reject', (ctx) => {
    console.log(ctx)
    ctx.answerCbQuery('accepted')
})



export default composer