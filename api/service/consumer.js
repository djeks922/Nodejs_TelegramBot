import logger from '../logger/index.js'
import Consumer from '../models/tg-consumer.js'

export const createConsumer = async (consumer) => {
    try {
       const _consumer = await Consumer.findOneAndUpdate(consumer,{},{upsert:true})
     
       return _consumer
    } catch (error) {
        logger.error(error)
    }
}

export const getConsumers = async (filter = {}) => {
    try {
       const consumer = await Consumer.find(filter).lean()

       return consumer
    } catch (error) {
        logger.error(error)
    }
}

export const getConsumerByUserID = async (id) => {
    try {
       const consumer = await Consumer.findOne({userID: id}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
    }
}

export const getConsumerByChatID = async (id) => {
    try {
       const consumer = await Consumer.findOne({chatID: id}).lean()

       return consumer
    } catch (error) {
        logger.error(error)
    }
}

export const deleteConsumerByChatID = async (id) => {
    try {
       const consumer = await Consumer.deleteOne({chatID: id})

       return consumer
    } catch (error) {
        logger.error(error)
    }
}