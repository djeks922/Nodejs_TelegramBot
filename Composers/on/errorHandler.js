import {typeCallbackNotification,typeMsgErrNotification} from '../../helpers/errorNotifications.js'
import logger from '../../api/logger/index.js'

export const errorHandler =  async (err, ctx) => {
    try {
        logger.error(err);
  
        if(ctx.message){
            await ctx.tg.sendMessage(process.env.ERROR_REPORT_CHAT_ID,typeMsgErrNotification(err,ctx.message));
        }

        if(ctx.callbackQuery){
            await ctx.tg.sendMessage(process.env.ERROR_REPORT_CHAT_ID,typeCallbackNotification(err,ctx.callbackQuery));
        }
        
    } catch (error) {
        throw error
    }
}

export default errorHandler