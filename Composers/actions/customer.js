import {getProposals} from '../../api/service/proposal.js'


export const updateProposals = async(ctx) => {
    try {
        ctx.session.proposals = await getProposals({consumer:ctx.session.consumer})
        await ctx.answerCbQuery('Proposals updated')
    } catch (error) {
        throw error
    }
}