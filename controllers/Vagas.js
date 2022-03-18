import Vaga from "../models/VagaModel.js";
 
export const getAllVagas = async (req, res) => {
    try {
        const vagas = await Vaga.findAll();
        res.json(vagas);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getVagaById = async (req, res) => {
    try {
        const vaga = await Vaga.findAll({
            where: {
                id_Vaga: req.params.id_Vaga
            }
        });
        res.json(vaga[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
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
 
export const updateVaga = async (req, res) => {
    try {
        await Vaga.update(req.body, {
            where: {
                id_Vaga: req.params.id_Vaga
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
 
export const deleteVaga = async (req, res) => {
    try {
        await Vaga.destroy({
            where: {
                id_Vaga: req.params.id_Vaga
            }
        });
        res.json({
            "message": "Vaga Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}