import  express  from 'express';

import { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    checkUser
} from "../controllers/Users.js";
import { getJobByUserId } from '../controllers/Jobs.js';
 
const router = express.Router();

//Routes for User
router.get('/', getAllUsers);
router.get('/minhasVagas/:id',getJobByUserId)
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/login',checkUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;