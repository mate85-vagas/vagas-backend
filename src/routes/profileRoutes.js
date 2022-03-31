import express from 'express';
import { 
    getCurrentUserProfile,
    getAllProfiles,
    getProfileById,
    updateProfile
} from "../controllers/Profiles";

const router = express.Router();

//Routes for Profiles
router.get('/me', getCurrentUserProfile);
router.get('/', getAllProfiles);
router.get('/user/:user_id', getProfileById);
router.patch('/:id', updateProfile);
export default router;