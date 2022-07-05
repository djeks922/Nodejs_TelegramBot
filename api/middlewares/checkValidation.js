import { varifyTelegramWebAppData } from '../../helpers/validateWebAppData.js'

export default  async (req,res) => {
    const ok =  await varifyTelegramWebAppData(req.body.initData)
    if(ok) return res.send(true)
    res.status(401).send({message: 'Not trusted'})
 }