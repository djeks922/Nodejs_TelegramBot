import logger from "../../api/logger/index.js";
import {
  getConsumerBySessionIDs,
  createConsumer,
} from "../../api/service/consumer.js";
import { getProposals } from "../../api/service/proposal.js";

const setSession = async (ctx, type = "consumer") => {
  try {
    const { id: cID } = ctx.callbackQuery?.message.chat || ctx.message?.chat;
    const { id: uID } = ctx.callbackQuery?.from || ctx.message?.from;

    const _consumer = await getConsumerBySessionIDs(cID, uID);
    if (_consumer) {
      ctx.session.consumer = _consumer;
      type === "consumer"
        ? (ctx.session.proposals = await getProposals({ consumer: _consumer }))
        : "";
    } else {
      const consumer = {
        name: ctx.message.from.first_name,
        username: ctx.message.from.username,
        userID: ctx.message.from.id,
        chatID: ctx.chat.id,
      };
      type === "admin" ? (consumer.isAdmin = true) : "";

      const _consumer = await createConsumer(consumer);
      type === "consumer"
        ? logger.info(
            `New user started the bot! Username: ${consumer.username} - id: ${consumer.userID}`
          )
        : logger.info(
            `New admin entered ! Username: ${consumer.username} - id: ${consumer.userID}`
          );
      ctx.session.consumer = _consumer;
      !_consumer.isAdmin
        ? (ctx.session.proposals = await getProposals({ consumer: _consumer }))
        : "";
    }
  } catch (error) {
    throw error;
  }
};

export default async (ctx, next) => {
  try {
    if (
      ctx.message?.chat?.type === "private" ||
      ctx.callbackQuery?.message?.chat?.type === "private"
    ) {
      if (!ctx.session.consumer) {
        await setSession(ctx);
      }
      return await next();
    }

    if (
      ["group", "supergroup"].includes(ctx.message?.chat?.type) ||
      ["group", "supergroup"].includes(ctx.callbackQuery?.message?.chat?.type)
    ) {
      // console.log(ctx.message);
      // console.log(ctx.callbackQuery ? ctx.callbackQuery : "");
      // Allow if its ADMIN-PANEL group or return
      if (
        ctx.message?.chat.id === +process.env.ADMIN_CHAT_ID ||
        ctx.callbackQuery?.message.chat.id === +process.env.ADMIN_CHAT_ID
      ) {
        if (!ctx.session.consumer) {
          await setSession(ctx, "admin");
        }
        await next();
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
