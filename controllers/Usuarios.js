import Usuario from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 
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
                idUsuario: req.params.id
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
        const salt = await bcrypt.genSalt(10);
        req.body.senhaUsuario = await bcrypt.hash(req.body.senhaUsuario, salt);
        await Usuario.create(req.body);
        res.json({
            "message": "Usuario Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

//Check user credentials
export const checkUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({
            where: {
                emailUsuario: req.body.emailUsuario
            }
        });
        if (usuario[0]){
            //Compare password from req body to stored password by bcrypt compare
            const validPassword = await bcrypt.compare(req.body.senhaUsuario, usuario[0].senhaUsuario);
            if(validPassword){
                const id = usuario[0].idUsuario;
                dotenv.config();
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 7200 // expires in 2h
                  });
                res.json({ token: token });
            }
            else{
                res.status(401).json({ message: "Unauthorized" });
            }
        }
        else{
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Update user record on db by given id
export const updateUsuario = async (req, res) => {
    try {
        await Usuario.update(req.body, {
            where: {
                idUsuario: req.params.id
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
                idUsuario: req.params.id
            }
        });
        res.json({
            "message": "Usuario Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}