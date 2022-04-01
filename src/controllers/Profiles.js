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
        await Profile.update(req.body, {
            where: {
                [ProfileModel.id]: req.params.id
            }
        });
        res.json({
            "message": "Perfil atualizado."
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}