import Transaction from "../models/tg-transaction.js";
import { getConsumerByKeyword } from "./consumer.js";
import { getProposalByKeyword } from "./proposal.js";

export const createTransaction = async (tr) => {
  try {
    const _transaction = await Transaction.create(tr);

    await _transaction.save();

    return _transaction;
  } catch (error) {
    throw error;
  }
};
export const getTransactionByID = async (id) => {
  try {
    const transaction = await Transaction.findOne({ _id: id })
      .populate("from")
      .populate("to")
      .populate("proposal")
      .populate({ path: "package", populate: "influencer" });

    return transaction;
  } catch (error) {
    throw error;
  }
};
export const getTransactionCount = async (query) => {
  try {
    const transactionCount = await Transaction.countDocuments(query);

    return transactionCount;
  } catch (error) {
    throw error;
  }
};
export const getTransactionsByFilter = async (filter = {}) => {
  try {
    const transaction = await Transaction.find(filter)
      .populate("from")
      .populate("to")
      .populate("proposal")
      .populate({ path: "package", populate: "influencer" });

    return transaction;
  } catch (error) {
    throw error;
  }
};
export const getTransactionByTxID = async (txID) => {
  try {
    const transaction = await Transaction.findOne({ txID: txID })
      .populate("from")
      .populate("to")
      .populate("proposal")
      .populate({ path: "package", populate: "influencer" });

    return transaction;
  } catch (error) {
    throw error;
  }
};
export const getTransactionsByKeyword = async (keyword) => {
  try {
    const consumer =  getConsumerByKeyword(keyword)
    const proposal =  getProposalByKeyword(keyword)
    const [con, prop] = await Promise.all([consumer,proposal])

    const transactions = await Transaction.find({$or: [{from: con?._id},{proposal: prop?._id}]})
    .populate("from")
    .populate("to")
    .populate("proposal")
    .populate({ path: "package", populate: "influencer" });
  
    return transactions
  } catch (error) {
    throw error
  }
}
export const getVerifiedTransactions = async () => {
  try {
    const transaction = await Transaction.find({
      status: "VERIFIED-admin",
      forwarded: false,
    })
      .populate("from")
      .populate("to")
      .populate("proposal")
      .populate({ path: "package", populate: "influencer" });

    return transaction;
  } catch (error) {
    throw error;
  }
};
export const updateTransaction = async (transaction, updates) => {
  try {
    const info = await Transaction.updateOne(transaction, updates);

    return info;
  } catch (error) {
    throw error;
  }
};
