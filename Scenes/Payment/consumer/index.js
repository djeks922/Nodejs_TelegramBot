import { Scenes } from "telegraf";
import { enter, leave, onCallbackQr, onExit, onMessage, onText } from "./handlers.js";
const { BaseScene } = Scenes;

const paymentConsumerScene = new BaseScene("payment-scene-toAdmin-id");

paymentConsumerScene.enter(enter);
paymentConsumerScene.leave(leave);

paymentConsumerScene.hears('exit', onExit)

paymentConsumerScene.on("text", onText);
paymentConsumerScene.on("message", onMessage);

paymentConsumerScene.on("callback_query", onCallbackQr);

export default paymentConsumerScene;
