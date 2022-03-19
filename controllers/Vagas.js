import Vaga from "../models/VagaModel.js";
import Usuario from "../models/UsuarioModel.js";
 
//Get all jobs from db
export const getAllVagas = async (req, res) => {
    try {
        const vagas = await Vaga.findAll({
            include:[
                {
                    model: Usuario,
                    as: "usuario",
                    attributes:["id_Usuario","Email_Usuario"]
                }
            ]
        });
        res.json(vagas);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Get a job by given id
export const getVagaById = async (req, res) => {
    try {
        const vaga = await Vaga.findAll({
            where: {
                id_Vaga: req.params.id
            },
            include:[
                {
                    model: Usuario,
                    as: "usuario",
                    attributes:["id_Usuario","Email_Usuario"]
                }
            ]
        });
        res.json(vaga[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

//Get all jobs related to a user by given user id
export const getVagaByUserId = async (req, res) => {
    try {
        const vaga = await Vaga.findAll({
            where: {
                usuarioIdUsuario: req.params.id
            }
        });
        res.json(vaga);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Create new job
export const createVaga = async (req, res) => {
    try {
        await Vaga.create(req.body);
        res.json({
            "message": "Vaga Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Update job record on db 
export const updateVaga = async (req, res) => {
    try {
        await Vaga.update(req.body, {
            where: {
                id_Vaga: req.params.id
            }
        });
        res.json({
            "message": "Vaga Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
        console.log(error.message)
    }  
}
 
//Delete job from db
export const deleteVaga = async (req, res) => {
    try {
        await Vaga.destroy({
            where: {
                id_Vaga: req.params.id
            }
        });
        res.json({
            "message": "Vaga Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}