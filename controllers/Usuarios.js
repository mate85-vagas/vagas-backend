import Usuario from "../models/UsuarioModel.js";
 
//Get all users from db
export const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Get user by given id from db
export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({
            where: {
                id_Usuario: req.params.id
            }
        });
        res.json(usuario[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Create new user
export const createUsuario = async (req, res) => {
    try {
        await Usuario.create(req.body);
        res.json({
            "message": "Usuario Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Update user record on db by given id
export const updateUsuario = async (req, res) => {
    try {
        await Usuario.update(req.body, {
            where: {
                id_Usuario: req.params.id
            }
        });
        res.json({
            "message": "Usuario Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
        console.log(error.message)
    }  
}
 
//Delete user from db
export const deleteUsuario = async (req, res) => {
    try {
        await Usuario.destroy({
            where: {
                id_Usuario: req.params.id
            }
        });
        res.json({
            "message": "Usuario Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}