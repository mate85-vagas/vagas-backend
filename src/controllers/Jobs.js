import Job  from '../models/JobModel.js';
import User from '../models/UserModel.js';
import { UserAttrs } from '../models/UserAttrs.js';
import { JobAttrs } from '../models/JobAttrs.js';
import {buildJobWhereClause} from '../utils/filters.js';
 
//Get all jobs from db (can return filtered data by HTTP GET params)
export const getAllJobs = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber)
        const itemsPerPage = parseInt(req.query.itemsPerPage)
        const jobs = await Job.findAndCountAll({
            include:[
                {
                    model: User,
                    as: "user",
                    attributes:[UserAttrs.name,UserAttrs.email]
                }
            ],
            where: buildJobWhereClause(req),
            offset: ((pageNumber-1)*itemsPerPage|| 0),
            limit: (itemsPerPage|| undefined)

        });
        res.json(jobs);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Get a job by given id
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findOne({
            where: {
                [JobAttrs.id]: req.params.id
            },
            include:[
                {
                    model: User,
                    as: "user",
                    attributes:[UserAttrs.name,UserAttrs.email]
                }
            ]
        });
        res.json(job);
    } catch (error) {
        res.json({ message: error.message });
    }  
}


//Get all jobs related to a user by given user id
export const getJobByUserId = async (req, res) => {
    try {
        const job = await Job.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.json(job);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Create new job
export const createJob = async (req, res) => {
    try {
        await Job.create(req.body);
        res.json({
            "message": "Vaga criada."
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
//Update job record on db 
export const updateJob = async (req, res) => {
    try {
        await Job.update(req.body, {
            where: {
                [JobAttrs.id]: req.params.id
            }
        });
        res.json({
            "message": "Vaga atualizada."
        });
    } catch (error) {
        res.json({ message: error.message });
        console.log(error.message)
    }  
}
 
//Delete job from db
export const deleteJob = async (req, res) => {
    try {
        await Job.destroy({
            where: {
                [JobAttrs.id]: req.params.id
            }
        });
        res.json({
            "message": "Vaga deletada."
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
