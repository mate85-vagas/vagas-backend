import EmailList from '../models/EmailListModel.js';
import { EmailListAttrs } from '../models/EmailListAttrs.js';

const createBulkEmailLists = async (body) => {
  const emailList = await EmailList.bulkCreate(body);
  return emailList;
};

const getAllEmailLists = async () => {
  const emailLists = await EmailList.findAndCountAll();
  return emailLists;
};

const getEmailListById = async (id) => {
  const emailList = await EmailList.findOne({
    where: {
      [EmailListAttrs.id]: id
    }
  });
  return emailList;
};

const updateAllIsActive = async (state) => {
  if (state) {
    return await EmailList.update({ isActive: true }, { where: {} });
  } else {
    return await EmailList.update({ isActive: false }, { where: {} });
  }
};

const updateEmailList = async (body, id) => {
  return await EmailList.update(body, {
    where: {
      [EmailListAttrs.id]: id
    }
  });
};

const deleteBulkEmailLists = async (ids) => {
  return await EmailList.destroy({
    where: {
      [EmailListAttrs.id]: ids
    }
  });
};

const countIsActive = async () => {
  return EmailList.count({ where: { isActive: true } });
};

export default {
  createBulkEmailLists,
  getAllEmailLists,
  getEmailListById,
  updateAllIsActive,
  updateEmailList,
  deleteBulkEmailLists,
  countIsActive
};
