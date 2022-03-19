import express from "express";

import { 
    getAllUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
} from "../controllers/Usuarios.js";
import { getVagaByUserId } from "../controllers/Vagas.js";
 
const router = express.Router();

//Routes for Usuario
router.get('/', getAllUsuarios);
router.get('/minhasVagas/:id',getVagaByUserId)
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;