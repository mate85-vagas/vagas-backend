import express from "express";
 
import { 
    getAllVagas,
    createVaga,
    getVagaById,
    updateVaga,
    deleteVaga
} from "../controllers/Vagas.js";
 
const router = express.Router();
 
router.get('/', getAllVagas);
router.get('/:id_Vaga', getVagaById);
router.post('/', createVaga);
router.patch('/:id_Vaga', updateVaga);
router.delete('/:id_Vaga', deleteVaga);
 
export default router;