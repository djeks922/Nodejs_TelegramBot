import { Scenes} from "telegraf";
import { getInfluencerByID,getPackage } from "../../api/service/influencer.js";
import {
  nameStep,
  websiteStep,
  contractStep,
  twitterStep,
  telegramStep,
  developerUsernameStep,
  descriptionStep,
  enter,
  leave,
  done,
  chooseInfluencer_callback,
} from "./handlers.js";
import { packagesButtons,influencerButtons } from "./markup.js";
import {activeInfluencerChooseList} from '../../helpers/influencer.js'
const { WizardScene } = Scenes;

const consumerScene = new WizardScene(
  "consumer-scene-id",
  nameStep,
  websiteStep,
  contractStep,
  twitterStep,
  telegramStep,
  developerUsernameStep,
  descriptionStep
);

consumerScene.enter(enter);
consumerScene.leave((ctx) => {
  
});

consumerScene.on('message', async(ctx,next) => {
  if(ctx.message.text) await next()
  else ctx.reply('not valid input')
})

consumerScene.action("ps leave", leave);

consumerScene.action("ps done", done);

consumerScene.action(/ps+/g, async (ctx) => {
 
  const infID = ctx.callbackQuery.data.split(' ')[1]

  const isSelected = ctx.wizard.state.packages.some(e => e.influencer._id == infID)
  if(isSelected) {
    ctx.wizard.state.packages = ctx.wizard.state.packages.filter( pkg => pkg.influencer._id != infID)
    await ctx.answerCbQuery('Package pulled out from proposal')
    return await ctx.editMessageText(activeInfluencerChooseList(ctx.wizard.state.infstmp),influencerButtons(ctx.wizard.state.infstmp,ctx.wizard.state.packages))
  }
  const inf = await getInfluencerByID(infID,{populate: true})
  await ctx.answerCbQuery()
  let text = `Choose from below packages: \n`

  for(let pkg of inf.packages){
    text = text.concat(`Name: ${pkg.name} - Detail: ${pkg.detail} - Price: ${pkg.price}\n`)
  }
  ctx.session.pkgtmp = {}
  ctx.session.pkgtmp.influencer = inf 
  await ctx.editMessageText(text,packagesButtons(inf))
});

consumerScene.action(/pp+/, async (ctx) => {
  
  const pkgID = ctx.callbackQuery.data.split(' ')[1]
  if(pkgID === 'back') return await ctx.editMessageText(activeInfluencerChooseList(ctx.wizard.state.infstmp),influencerButtons(ctx.wizard.state.infstmp,ctx.wizard.state.packages))
  
  // const pkg = await getPackage(pkgID)
  ctx.answerCbQuery()
  ctx.session.pkgtmp.package = pkgID
  ctx.wizard.state.packages.push(ctx.session.pkgtmp)
  ctx.editMessageText(activeInfluencerChooseList(ctx.wizard.state.infstmp),influencerButtons(ctx.wizard.state.infstmp,ctx.wizard.state.packages))
})

consumerScene.on('callback_query', async (ctx) => {
  ctx.answerCbQuery()
})

export default consumerScene;
