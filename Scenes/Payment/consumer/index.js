import { Scenes } from "telegraf";
import { enter, onCallbackQr, onMessage, onText } from "./handlers.js";
const { BaseScene } = Scenes;

const paymentConsumerScene = new BaseScene("payment-scene-toAdmin-id");

paymentConsumerScene.enter(enter);

paymentConsumerScene.on("text", onText);
paymentConsumerScene.on("message", onMessage);

paymentConsumerScene.on("callback_query", onCallbackQr);

export default paymentConsumerScene;
