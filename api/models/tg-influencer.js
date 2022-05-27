import mongoose from 'mongoose'

const {Schema, model} = mongoose


const influencerSchema = new Schema(
    {
        name: String,
        username: String,
        userID: Number,
        chatID: Number,
        packages: [{type: Schema.Types.ObjectId, ref: 'tg-package'}],
        socials: [{type: Schema.Types.ObjectId, ref: 'tg-social'}],
        status: {type: String, enum: ['active','inreview','inactive'], default: 'inactive'}
    }
)



export default model('tg-influencer', influencerSchema)