import { backToRegistryButtons } from "../markup.js";
import axios from "axios";
import fs from 'fs'

export const enter = async (ctx) => {
  try {
    await ctx.reply(
      "Send avatar image",
      backToRegistryButtons()
    );
  } catch (error) {
    throw error;
  }
};

export const leave = async (ctx) => {
  // await ctx.scene.enter('influencer-scene-id')
};

export const onBackHears = async (ctx) => {
  try {
    await ctx.scene.enter("influencer-scene-id");
  } catch (error) {
    throw error;
  }

  // await ctx.deleteMessage()
  // await ctx.deleteMessage(ctx.message.message_id - 1)
};

export const onPhoto = async (ctx) => {
  try {
    const fileId = ctx.message.photo[ctx.message.photo.length-1].file_id
    ctx.telegram.getFileLink(fileId).then(url => {    
      // console.log(url)
      let href = url.href
      // console.log(href)
      axios({url: href, responseType: 'stream'}).then(response => {
        response.data.pipe(fs.createWriteStream(`./public/influencer/${ctx.update.message.from.id}.jpg`))
        .on('finish', async () => {
          await ctx.reply('Avatar successfully saved!')
          ctx.session.influencer.avatar = `./public/influencer/${ctx.update.message.from.id}.jpg`
          await ctx.scene.enter('influencer-scene-id')
        })
        .on('error', async e => {
          throw e
        })
      });
              
  })
    // await ctx.
  } catch (error) {
    throw error
  }
}

export const onMessage = async (ctx) => {
  try {
    await ctx.reply("no such option");
  } catch (error) {
    throw error;
  }
};

export const onCallbackQr = async (ctx) => {
  try {
    await ctx.answerCbQuery("");
  } catch (error) {
    throw error;
  }
};
