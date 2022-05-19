import mongoose from 'mongoose'

const {Schema, model} = mongoose


const influencerSchema = new Schema(
    {
        name: String,
        username: String,
        userID: Number,
        chatID: Number,
        price: Number,
        status: {type: String,enum: ['active','inbetween','inactive'], default: 'inactive'}
    }
)



export default model('tg-influencer', influencerSchema)