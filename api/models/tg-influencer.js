import mongoose from 'mongoose'

const {Schema, model} = mongoose


const influencerSchema = new Schema(
    {
        name: String,
        username: String,
        userID: Number,
        chatID: Number,
        status: {type: Boolean, default: false}
    }
)



export default model('tg-consumer', influencerSchema)