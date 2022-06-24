import {Composer} from 'telegraf'

const webappComposer = new Composer()

webappComposer.on('web_app_data', (ctx)=> {
    console.log(ctx.message)
})

export default webappComposer