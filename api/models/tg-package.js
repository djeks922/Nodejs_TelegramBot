import mongoose from 'mongoose'

const {Schema, model} = mongoose


const packageSchema = new Schema(
    {
        name: String,
        detail: String,
        price: String
    }
)



export default model('tg-package', packageSchema)