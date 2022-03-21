import express from 'express';
 
import { 
    getAllVagas,
    createVaga,
    getVagaById,
    updateVaga,
    deleteVaga
} from "../controllers/Vagas.js";

const router = express.Router();
 
//Routes for Vaga
router.get('/', getAllVagas);
router.get('/:id', getVagaById);
router.post('/', createVaga);
router.patch('/:id', updateVaga);
router.delete('/:id', deleteVaga);


export default router;