import {getConsumerByChatID,createConsumer} from '../api/service/consumer.js'
import {getProposals} from '../api/service/proposal.js'

export default async (ctx, next)=> { // for all routes
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
          ctx.session.consumer = consumer
          ctx.session.proposals = await getProposals({consumer:consumer})
          createConsumer(consumer);
        }
      }
      await next()
  }