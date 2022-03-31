import Profile from '../models/ProfileModel.js'

// @route    GET api/profile/me
// @desc     GET current users profile
// @acess    Private
export const getCurrentUserProfile = async (req, res) => {
 try{
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    
    if(!profile) {
        return res.status(400).json({ msg: 'Não existe perfil para esse usuário.' })
    }

    res.json(profile);
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro de servidor.');
 }
}
 
// @route GET api/profile
// @desc  GET all profiles
// @acess Public
export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro de servidor.');
    }
}
// @route GET api/profile/user/:user_id
// @desc  GET profile user by ID
// @acess Public
export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',
         ['name', 'avatar']);

        if (!profile)
         return res.status(400).json({ msg: 'Perfil não encontrado.' })

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Perfil não encontrado.' })
        }
        res.status(500).send('Erro de servidor.');
    }
}
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