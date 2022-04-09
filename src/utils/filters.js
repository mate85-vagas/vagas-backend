import { Sequelize } from 'sequelize';
const { Op } = Sequelize;

//Builds where clause for job searching based on GET params
export const buildJobWhereClause = (req) =>{
    var content = {}
    if(req.query.filter){
        content = { 
            [Op.or]:{
                title:{ 
                    [Op.like]: `%${req.query.filter}%`
                },
                description:{
                    [Op.like]: `%${req.query.filter}%`
                }
            }
        }
    } 
    if (req.query.type) content.type = {[Op.like]: `%${req.query.type}%`}
    if (req.query.min & req.query.max) content.salary = {[Op.between]: [parseFloat(req.query.min),parseFloat(req.query.max)]}
    if (req.query.site) content.site = {[Op.like]: `%${req.query.site}%`}
    if (req.query.workload) content.workload = parseFloat(req.query.workload)
    if (req.query.scholarity) content.scholarity = {[Op.like]: `%${req.query.scholarity}%`}
    if (req.query.createdAt) content.createdAt = req.query.createdAt
    
    return content;
}

export const buildProfileWhereClause = (req) =>{
    var content = {}
    content.searchable = {[Op.eq]: true}
    if (req.query.scholarity) content.scholarity = {[Op.like]: `%${req.query.scholarity}%`}
    if (req.query.knowledge) content.knowledge = {[Op.like]: `%${req.query.knowledge}%`}
    if (req.query.technologies) content.technologies = {[Op.like]: `%${req.query.technologies}%`}
    if (req.query.languages) content.languages = {[Op.like]: `%${req.query.languages}%`}
    return content;
}