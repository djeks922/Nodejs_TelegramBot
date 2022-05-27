import { Scenes} from "telegraf";
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
  console.log('leaved proposal scene')
});

consumerScene.on('message', async(ctx,next) => {
  if(ctx.message.text) await next()
  else ctx.reply('not valid input')
})

consumerScene.action("ps leave", leave);

consumerScene.action("ps done", done);

consumerScene.action(/ps+/g, chooseInfluencer_callback);

consumerScene.on('callback_query', async (ctx) => {
  ctx.answerCbQuery()
})

export default consumerScene;
