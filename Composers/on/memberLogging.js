import {Composer} from 'telegraf'

const composer = new Composer()

composer.on('group_chat_created', ctx => {
    console.log('group chat created')
    if(ctx.message.chat.id !== -581116482){
        ctx.leaveChat()
    }
})

composer.on('my_chat_member', ctx => {
    console.log(ctx.myChatMember,'my_chat_member (composer)')
})

composer.on('new_chat_members', async (ctx) => {
    console.log(ctx.message,'new member')
})

composer.on('left_chat_member', (ctx) => {
    console.log(ctx.message ,'left member')
})

export default composer