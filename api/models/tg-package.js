import mongoose from 'mongoose'

const {Schema, model} = mongoose


const packageSchema = new Schema(
    {
        influencer: {type: Schema.Types.ObjectId, ref: 'tg-influencer'},
        name: String,
        detail: String,
        price: String
    }
)



export default model('tg-package', packageSchema)