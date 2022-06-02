import {getConsumerByChatID,createConsumer} from '../api/service/consumer.js'
import {getProposals} from '../api/service/proposal.js'

export default async (ctx, next)=> { // for all routes
    try {
      if(!ctx.session.consumer) {
        const {id} = ctx.callbackQuery?.message.chat || ctx.message?.chat
        const _consumer = await getConsumerByChatID(id)
        if(_consumer){
         
          ctx.session.consumer = _consumer
          ctx.session.proposals = await getProposals({consumer:_consumer})
        
        }else{
        
          const  consumer = {
            name: ctx.message.from.first_name,
            username: ctx.message.from.username,
            userID: ctx.message.from.id,
            chatID: ctx.chat.id,
          }
          
          const _consumer = await createConsumer(consumer);
          ctx.session.consumer = _consumer
          ctx.session.proposals = await getProposals({consumer:_consumer})
        }
      }
      await next()
    } catch (error) {
      throw error
    }
    
  }