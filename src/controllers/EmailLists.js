import repository from '../repositories/EmailListRepository.js';
import auth from '../utils/auth.js';

export const getAllEmailLists = async (req, res) => {
  try {
    auth.getTokenProperties(req.headers['x-access-token']);
    const emailList = await repository.getAllEmailLists();
    res.json(emailList);
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

export const getEmailListById = async (req, res) => {
  try {
    const { isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    if (isAdmin) {
      const emailList = await repository.getEmailListById(req.params.id);
      res.json(emailList);
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createBulkEmailLists = async (req, res) => {
  try {
    const { isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    if (isAdmin) {
      const emailLists = await repository.createBulkEmailLists(req.body);
      if (emailLists.length > 0)
        res.json({
          message: 'Listas de email criadas.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateAllIsActive = async (req, res) => {
  try {
    const { isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    if (isAdmin) {
      const result = await repository.updateAllIsActive(req.body.state);
      if (result)
        res.json({
          message: 'Status das listas atualizado.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateEmailList = async (req, res) => {
  try {
    const { isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    if (isAdmin) {
      const result = await repository.updateEmailList(req.body, req.params.id);
      if (result[0] == 1)
        res.json({
          message: 'Lista de e-mails atualizada.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteBulkEmailLists = async (req, res) => {
  try {
    const { isAdmin } = auth.getTokenProperties(req.headers['x-access-token']);
    if (isAdmin) {
      const result = await repository.deleteBulkEmailLists(req.params.ids.split(','));
      if (result)
        res.json({
          message: 'Listas de e-mail deletadas.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getEmailListState = async (req, res) => {
  try {
    let status = await repository.countIsActive();
    if (status == 0) res.json({ status: false });
    else res.json({ status: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
