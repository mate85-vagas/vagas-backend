import repository from '../repositories/ProfileRepository.js';
import auth from '../utils/auth.js';
import { buildProfileWhereClause, buildUserNameWhereClause } from '../utils/filters.js';

//Get all searchable profiles
export const getAllProfiles = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const filters = buildProfileWhereClause(req);
    const name = buildUserNameWhereClause(req);
    const profiles = await repository.getAllProfiles(filters, itemsPerPage, pageNumber, name);
    res.json(profiles);
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await repository.getProfileById(req.params.id);
    if (profile) {
      if (profile.searchable) res.json(profile);
      else {
        const { userId } = auth.getTokenProperties(req.headers['x-access-token']);
        if (profile.userId == userId) res.json(profile);
        else throw new Error('Acesso não autorizado.');
      }
    } else res.json({ message: 'Perfil não encontrado.', error: true });
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const profile = await repository.getProfileById(req.params.id);
    if (profile) {
      if (profile.userId == userId) {
        auth.checkToken(userId, req.headers['x-access-token']);
        const result = await repository.updateProfile(req.body, req.params.id);
        if (result[0] == 1)
          res.json({
            message: 'Perfil atualizado.'
          });
        else throw new Error('Falha ao realizar operação.');
      } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
    } else res.json({ message: 'Perfil não encontrado.', error: true });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createProfile = async (req, res) => {
  try {
    auth.checkToken(req.body.userId, req.headers['x-access-token']);
    const profile = await repository.createProfile(req.body);
    if (profile)
      res.json({
        message: 'Perfil criado.'
      });
    else throw new Error('Falha ao realizar operação.');
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = auth.getTokenProperties(req.headers['x-access-token']);
    const profile = await repository.getProfileByUserId(userId);

    if (profile.id == req.params.id) {
      const result = await repository.deleteProfile(profile.id);
      if (result)
        res.json({
          message: 'Perfil deletado.'
        });
      else throw new Error('Falha ao realizar operação.');
    } else res.status(401).json({ message: 'acesso não autorizado.', error: true, notAuthorized: true });
  } catch (error) {
    if (!error.auth) res.json({ message: error.message, error: true });
    else res.json({ message: error.message, error: true, notAuthorized: true });
  }
};
