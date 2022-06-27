import {Composer} from 'telegraf'

const webappComposer = new Composer()

webappComposer.on('message', async (ctx)=> {
   if(!ctx.message.via_bot) return 
   
   console.log(ctx.message)
})

webappComposer.on('web_app_data', (ctx)=> {
    console.log(ctx.message)
})


export default webappComposer