import repository from '../repositories/EmailListRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import auth from '../utils/auth.js';

export const getAllEmailLists = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const emailList = await repository.getAllEmailLists();
      res.json(emailList);
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getEmailListById = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const emailList = await repository.getEmailListById(req.params.id);
      res.json(emailList);
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createEmailList = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const emailList = await repository.createemailList(req.body, userId);
      if (emailList)
        res.json({
          message: 'Lista de emails criada.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateAllIsActive = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const result = await repository.updateAllIsActive(req.params.state);
      if (result)
        res.json({
          message: 'Status das listas atualizadas.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateEmailList  = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const result = await repository.updateEmailList (req.body, req.params.id);
      if (result[0] == 1)
        res.json({
          message: 'Lista de e-mails atualizada.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteEmailList = async (req, res) => {
  try {
    const userId = req.body.userId;
    auth.checkToken(userId, req.headers['x-access-token']);
    const user = await UserRepository.getUserById(userId);
    if (user.isAdmin) {
      const result = await repository.deleteEmailList(req.params.id);
      if (result)
        res.json({
          message: 'Lista de e-mails deletada.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
