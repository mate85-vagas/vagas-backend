import  User  from '../models/UserModel.js';
import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import  dotenv  from 'dotenv';
import { UserAttrs } from '../models/UserAttrs.js';
 
//Get all users from db
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Get user by given id from db
export const getUserById = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                [UserAttrs.id]: req.params.id
            }
        });
        res.json(user[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Create new user
export const createUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await User.create(req.body);
        res.json({
            "message": "User Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

//Check user credentials
export const checkUser = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                [UserAttrs.email]: req.body.email
            }
        });
        if (user[0]){
            //Compare password from req body to stored password by bcrypt compare
            const validPassword = await bcrypt.compare(req.body.password, user[0].password);
            if(validPassword){
                const id = user[0].id;
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
export const updateUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        await User.update(req.body, {
            where: {
                [UserAttrs.id]: req.params.id
            }
        });
        res.json({
            "message": "User Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Delete user from db
export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                [UserAttrs.id]: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}