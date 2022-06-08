import logger from '../logger/index.js'
import Consumer from '../models/tg-consumer.js'

export const createConsumer = async (consumer) => {
    try {
       const _consumer = await Consumer.findOneAndUpdate(consumer,{},{new:true,upsert:true})
     
       return _consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getConsumers = async (filter = {}) => {
    try {
       const consumer = await Consumer.find(filter).lean()

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getConsumerByUserID = async (id) => {
    try {
       const consumer = await Consumer.findOne({userID: id}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const getConsumerByChatID = async (id) => {
    try {
       const consumer = await Consumer.findOne({chatID: id}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const getConsumerByID = async (id) => {
    try {
       const consumer = await Consumer.findOne({_id: id}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}
export const getAdmins = async () => {
    try {
       const consumer = await Consumer.findOne({isAdmin: true}).select({chatID: 1}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}

export const deleteConsumerByChatID = async (id) => {
    try {
       const consumer = await Consumer.deleteOne({chatID: id})

       return consumer
    } catch (error) {
        logger.error(error)
        throw error
    }
}