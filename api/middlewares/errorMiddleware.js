export default async (err,res,req,next) => {
    const a = await bot.deleteWebhook()
    console.log(a, 'a')
  }