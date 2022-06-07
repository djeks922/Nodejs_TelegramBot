import mongoose from 'mongoose'

const {Schema, model} = mongoose


const socialSchema = new Schema(
    {
        url: String,
        platform: {type:String, enum: ['Facebook','Youtube','Telegram','Twitter','Instagram','Tiktok']}
    }
)



export default model('tg-social', socialSchema)