import repository from '../repositories/ProfileRepository.js';
import auth from '../utils/auth.js';
import { buildProfileWhereClause } from '../utils/filters.js';

//Get all searchable profiles
export const getAllProfiles = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const itemsPerPage = parseInt(req.query.itemsPerPage);
    const filters = buildProfileWhereClause(req);
    const profiles = await repository.getAllProfiles(filters, itemsPerPage, pageNumber);
    res.json(profiles);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const userId = auth.checkTokenAndReturnId(req.headers['x-access-token']);
    const profile = await repository.getProfileById(req.params.id);
    if (profile) {
      if (profile.userId == userId) res.json(profile);
      else throw new Error('Acesso não autorizado.');
    } else res.json({ message: 'Perfil não encontrado.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const profile = await repository.getProfileById(req.params.id);
    if (profile) {
      if (profile.userId == userId) {
        auth.checkToken(userId, req.headers['x-access-token']);
        await repository.updateProfile(req.body, req.params.id);
        res.json({
          message: 'Perfil atualizado.'
        });
      } else throw new Error('Acesso não autorizado.');
    } else res.json({ message: 'Perfil não encontrado.' });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const createProfile = async (req, res) => {
  try {
    auth.checkToken(req.body.userId, req.headers['x-access-token']);
    await repository.createProfile(req.body);
    res.json({
      message: 'Perfil criado.'
    });
  } catch (error) {
    res.json({ message: error.message, error: true });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = auth.checkTokenAndReturnId(req.headers['x-access-token']);
    const profile = await repository.getProfileByUserId(userId);
    console.log(profile.id);
    if (profile.id == req.params.id) {
      await repository.deleteProfile(profile.id);
      res.json({
        message: 'Perfil deletado.'
      });
    } else throw new Error('Acesso não autorizado.');
  } catch (error) {
    res.json({ message: error.message });
  }
};
