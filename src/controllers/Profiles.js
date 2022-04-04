import repository from '../repositories/ProfileRepository.js';

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
    res.json(profile);
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

export const deleteJob = async (req, res) => {
  try {
    await repository.deleteJob(req.params.id);
    res.json({
      message: 'Perfil deletado.'
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};