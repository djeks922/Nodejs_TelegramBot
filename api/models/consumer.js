import mongoose from 'mongoose'

const {Schema, model} = mongoose


const consumerSchema = new Schema(
    {
        name: String,
        username: String,
        userID: Number,
        chatID: Number
    }
)



export default model('consumer', consumerSchema)