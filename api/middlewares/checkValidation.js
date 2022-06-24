import { varifyTelegramWebAppData } from '../../helpers/validateWebAppData.js'

export default  async (req,res) => {
    console.log(req.body)
    const ok =  await varifyTelegramWebAppData(req.body.initData)
    console.log(ok)
    if(ok) return res.send(true)
    res.status(401).send({message: 'Not trusted'})
 }