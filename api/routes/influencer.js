import express from 'express'
import { get_influencers } from '../controller/influencer.js'

const route = express.Router()

route.get('/', get_influencers)

export default route