import logger from "../logger/index.js"

export default async (err,res,req,next) => {
  try {
    const a = await bot.deleteWebhook()
    console.log(a, 'a')
    logger.error(err)
    res.status(err.status).send({message: err.message})
  } catch (error) {
    throw error
  }  
}