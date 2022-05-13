import express from 'express'
import {config} from 'dotenv'
import axios from 'axios'
import bodyParser from 'body-parser'
config()

const {TOKEN,SERVER_URL} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL+URI

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())


const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async(req,res) => {
    console.log(req.body)

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: req.body.message.chat.id,
        text: req.body.message.text + req.body.message.from.first_name
    })

    return res.send()
})

app.listen(process.env.PORT || 5000 ,async()=> {
    console.log('app listening to port : 5000')
    await init()
})