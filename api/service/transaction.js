import Transaction from '../models/tg-transaction.js'



export const createTransaction = async (tr) => {
    try {
        const _transaction =  await Transaction.create(tr)

        await _transaction.save()

        return _transaction
    } catch (error) {
        throw error
    }
}
export const getTransactionByID = async (id) => {
    try {
        const transaction = await Transaction.findOne({_id: id}).populate('from').populate('to').populate('proposal')

        return transaction
    } catch (error) {
        throw error
    }
}
export const getVerifiedTransactions = async () => {
    try {
        const transaction = await Transaction.find({status: 'VERIFIED'}).populate('from').populate('to').populate('proposal')

        return transaction
    } catch (error) {
        throw error
    }
}