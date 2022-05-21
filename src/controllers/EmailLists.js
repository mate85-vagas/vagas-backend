import repository from '../repositories/EmailListRepository.js';

export const getAllEmailLists = async (req, res) => {
  try {
    const emailList = await repository.getAllEmailLists();
    res.json(emailList);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getEmailListById = async (req, res) => {
  try {
    const emailList = await repository.getEmailListById(req.params.id);
    res.json(emailList);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateAllIsActive = async (req, res) => {
  try {
    const result = await repository.updateAllIsActive(req.params.state);
    if (result)
      res.json({
        message: 'Status das listas atualizadas.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const updateEmailList  = async (req, res) => {
  try {
    const result = await repository.updateEmailList (req.body, req.params.id);
    if (result[0] == 1)
      res.json({
        message: 'Lista de e-mails atualizada.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteEmailList = async (req, res) => {
  try {
    const result = await repository.deleteEmailList(req.params.id);
    if (result)
      res.json({
        message: 'Lista de e-mails deletada.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};
