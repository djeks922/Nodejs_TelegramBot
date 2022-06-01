import {getProposals} from '../../api/service/proposal.js'


export const updateProposals = async(ctx) => {
    try {
        ctx.session.proposals = await getProposals({consumer:ctx.session.consumer})
    } catch (error) {
        throw error
    }
}