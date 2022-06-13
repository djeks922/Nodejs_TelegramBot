import mongoose from 'mongoose'

const {Schema, model} = mongoose


const consumerSchema = new Schema(
    {
        name: String,
        username: String,
        userID: Number,
        chatID: Number,
        isAdmin: {type: Boolean, default: false}
    },{timestamps: true}
)



export default model('tg-consumer', consumerSchema)