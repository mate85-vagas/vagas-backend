import EmailList from '../models/EmailListModel.js';
import { EmailListAttrs } from '../models/EmailListAttrs.js';

const createEmailList = async (body) => {
  const emailList = await EmailList.create(body);
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
  return await EmailList.update({"isActive": state});
};

const updateEmailList = async (body, id) => {
  return await EmailList.update(body, {
    where: {
      [EmailListAttrs.id]: id
    }
  });
};

const deleteEmailList = async (id) => {
  return await EmailList.destroy({
    where: {
      [EmailListAttrs.id]: id
    }
  });
};

export default { createEmailList, getAllEmailLists, getEmailListById, updateAllIsActive, updateEmailList, deleteEmailList };