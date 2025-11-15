const { Project } = require("../models");

const createProject = async(payload)=> {
    try {
        const { name ,start_date,end_date} = payload;
        const projectInDb = await Project.findOne({
            where: {name : name}
        })  

        if (projectInDb){
            return {
                statusCode : 422,
                success : false,
                message: "Project already exists"
            }
        }

        const newProject = await Project.create({
            name,
            start_date,
            end_date
        })

        return {
            statusCode : 201,
            success :true,
            message: "Project created successfully",
            data: newProject
        }
    } catch (error) {
        throw error
    }   
}


const viewProjects = async() => {
    try {
        const allProjects = await Project.findAll({
            attributes : {
                exclude: ["deleted_at"]
            }
        })

        return {
            statusCode : 200,
            success : true,
            message: "Data fetch successfully",
            data: allProjects
        }
    } catch (error) {
        throw error
    }
}

const deleteProject = async(projectId) => {
    try {
        const projectInDb = await Project.findByPk(projectId);

        if (!projectInDb){
            return {
                statusCode : 404,
                success: false,
                message: "Project not found"
            }
        }
        await projectInDb.destroy();

        return {
            statusCode : 200,
            success : true,
            message: "Project deleted successfully"
        }
    } catch (error) {
        throw error;
    }
}

const updateProject = async(projectId,payload)=>{
    try {
        const projectInDb = await Project.findByPk(projectId);
           if (!projectInDb){
            return {
                statusCode : 404,
                success: false,
                message: "Project not found"
            }
        }

        const updatedUser = await Project.update(payload,{
            where: {id : projectId}
        });

        return {
            statusCode : 200,
            success: true,
            message: "Project updated successfully",
        }
    } catch (error) {
        throw error
    }
}
module.exports= {
    createProject,
    viewProjects,
    updateProject,
    deleteProject
}