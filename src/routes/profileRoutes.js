import express from 'express';
import { 
    getAllProfiles,
    getProfileById,
    updateProfile
} from "../controllers/Profiles";

const router = express.Router();

//Routes for Profiles
router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.patch('/:id', updateProfile);
export default router;