import express from 'express'

const route = express.Router()

route.post('/', async (req,res) => {
    try {
        console.log(req.body)
        res.send('nice')
    } catch (error) {
        
    }
})

export default route