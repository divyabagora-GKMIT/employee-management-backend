const  { projectService } = require("../services");

const createProject = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(422).json({
                success: false,
                message: "Provide required fields"
            })
        }
        const result = await projectService.createProject(req.body);
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            })
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const viewProjects = async (req, res, next) => {
    try {
        const result = await projectService.viewProjects();
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
            data: result.data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const result = await projectService.deleteProject(projectId);
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }
        return res.status(result.statusCode).json({
            success: true,
            message: result.message
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateProject = async(req,res,next) => {
    try {
        const projectId = req.params.id
        const result = await projectService.updateProject(projectId,req.body);
        if (!result.success){
            return res.status(result.statusCode).json({
                success : result.success,
                message : result.message
            })
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}
 
module.exports = {
    createProject,
    viewProjects,
    deleteProject,
    updateProject
}