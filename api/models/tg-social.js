import mongoose from 'mongoose'

const {Schema, model} = mongoose


const socialSchema = new Schema(
    {
        url: String,
        platform: {type:String, enum: ['Facebook','Youtube','Telegram','Twitter','Instagram']}
    }
)



export default model('tg-social', socialSchema)