import {typeCallbackNotification,typeMsgErrNotification} from '../../helpers/errorNotifications.js'
import logger from '../../api/logger/index.js'

export const errorHandler =  async (err, ctx) => {
    try {
        logger.error(err);
  
        if(ctx.message){
            await ctx.tg.sendMessage(1316429545,typeMsgErrNotification(err,ctx.message));
        }

        if(ctx.callbackQuery){
            await ctx.tg.sendMessage(1316429545,typeCallbackNotification(err,ctx.callbackQuery));
        }
        
    } catch (error) {
        throw error
    }
}

export default errorHandler