import repository from '../repositories/ProfileRepository.js';
import auth from '../utils/auth.js';

//Get all searchable profiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await repository.getAllProfiles();
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
