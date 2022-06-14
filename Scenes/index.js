import { Scenes, Composer, session } from "telegraf";
import proposal from "./Proposal/index.js";
import registry, {
  socialScene,
  packageScene,
  walletScene,
  requirementScene,
  postScene
} from "./Registry/index.js";
import payment from "./Payment/index.js";
import sessionMiddleware from "../Composers/middlewares/sessionCustomerMiddleware.js";

const { Stage } = Scenes;

const composer = new Composer();

const stage = new Stage([
  proposal,
  registry,
  socialScene,
  packageScene,
  walletScene,
  requirementScene,
  postScene,
  payment.paymentToAdmin,
  payment.paymentToInfluencer,
]);

composer.use(session());
composer.use(stage.middleware(),sessionMiddleware);

export default composer;
