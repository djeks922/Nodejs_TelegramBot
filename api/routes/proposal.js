import express from 'express'
import {postProposal} from '../controller/proposal.js'
import { uploadProposalImages } from '../service/multer.js'
const route = express.Router()

route.post('/', uploadProposalImages,postProposal)

export default route