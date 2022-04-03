import repository from '../repositories/ProfileRepository.js';

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
    const profile = await repository.getProfileById(req.params.id);
    if (profile) res.json(profile);
    else res.json({ message: 'Perfil não encontrado.' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    await repository.updateProfile(req.body, req.params.id);
    res.json({
      message: 'Perfil atualizado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    await repository.createProfile(req.body);
    res.json({
      message: 'Perfil criado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    await repository.deleteProfile(req.params.id);
    res.json({
      message: 'Perfil deletado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
