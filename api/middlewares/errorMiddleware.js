import logger from "../logger/index.js"

export default async (err,req,res,next) => {
  try {
    logger.error(err)
    res.status(err.status).send({message: err.message})
  } catch (error) {
    throw error
  }  
}