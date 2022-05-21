import logger from "../logger/index.js";
import Proposal from "../models/tg-consumerProposal.js";
import { getConsumerByChatID} from "./consumer.js";

export const createProposal = async (proposal, consumerChatID) => {
  try {
    proposal.consumer = await getConsumerByChatID(consumerChatID);

    const _proposal = await Proposal.findOneAndUpdate(
      proposal,
      {},
      { upsert: true }
    );

    return _proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const getProposals = async (filter = {}) => {
  try {
    const proposal = await Proposal.find(filter)
      .populate("influencers", { chatID: 1 })
      .populate("consumer", { chatID: 1 })
      .populate("approvedBy", { chatID: 1, username: 1 })
      .populate("acceptedBy", { chatID: 1, username: 1 })
      .lean();

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const getProposalByID = async (id, {lean = true, populate = false}) => {
  try {
    const proposal = lean
      ? populate
        ? await Proposal.findOne({ _id: id })
            .populate("influencers")
            .populate("consumer", { chatID: 1, username: 1 })
            .populate("approvedBy", { chatID: 1, username: 1 })
            .populate("acceptedBy", { chatID: 1, username: 1 })
            .lean()
        : await Proposal.findOne({ _id: id }).lean()
      : populate
      ? await Proposal.findOne({ _id: id })
          .populate("influencers")
          .populate("consumer", { chatID: 1, username: 1 })
          .populate("approvedBy", { chatID: 1, username: 1 })
          .populate("acceptedBy", { chatID: 1, username: 1 })
      : await Proposal.findOne({ _id: id }).populate('approvedBy',{username: 1});

    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const deleteProposalByID = async (id) => {
  try {
    const proposal = await Proposal.deleteOne({ _id: id });
    // console.log(proposal);
    return proposal;
  } catch (error) {
    logger.error(error);
  }
};

export const updateProposalByID = async (id, updates) => {
  try {
    const proposal = await Proposal.updateOne({ _id: id }, updates);
    // console.log(proposal);
    return proposal;
  } catch (error) {
    logger.error(error);
  }
};
