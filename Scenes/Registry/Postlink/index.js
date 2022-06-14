import { Scenes , Composer} from "telegraf";
import { done, enter, leave, onCallbackQr, onMessage, onText } from "./handlers.js";

const { WizardScene } = Scenes;

const linkComposer = new Composer()

linkComposer.hears('done', done)

linkComposer.on("text", onText);
linkComposer.on("message", onMessage);


export const postScene = new WizardScene(
    "post-scene-id",
    linkComposer,
);

postScene.enter(enter)
postScene.leave(leave)

postScene.on('callback_query', onCallbackQr)

export default postScene;  