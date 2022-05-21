import EmailList from '../models/EmailListModel.js';
import { EmailListAttrs } from '../models/EmailListAttrs.js';

const getAllEmailsFromEmailLists = async () => {
  const EmailLists = await EmailList.findAndCountAll();
  return EmailLists;
};

const getEmailFromEmailListById = async (id) => {
  const EmailList = await EmailList.findOne({
    where: {
      [EmailListAttrs.id]: id
    }
  });
  return EmailList;
};

const updateAllIsActive = async (state) => {
  return await EmailList.update({"isActive": state});
};

const updateEmailFromEmailList = async (body, id) => {
  return await EmailList.update(body, {
    where: {
      [EmailListAttrs.id]: id
    }
  });
};

const deleteEmailFromEmailList = async (id) => {
  return await EmailList.destroy({
    where: {
      [EmailListAttrs.id]: id
    }
  });
};

export default { getAllEmailsFromEmailLists, getEmailFromEmailListById, updateAllIsActive, updateEmailFromEmailList, deleteEmailFromEmailList };