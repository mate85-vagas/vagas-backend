import express  from 'express';
 
import { 
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
} from "../controllers/Jobs.js";

const router = express.Router();
 
//Routes for Job
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);


export default router;