const { projectMembersService } = require("../services");

const assignProject = async (req, res, next) => {
    try {
        const { project_id, user_id, project_role } = req.body;
        if (!project_id || !user_id || !project_role) {
            return res.status(400).json({
                success: false,
                message: "Enter required fields",
            });
        }

        const result = await projectMembersService.assignProject(req.body);

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getProjectByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await projectMembersService.getProjectByUserId(userId);

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const getUsersByProjectId = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const result = await projectMembersService.getUsersByProjectId(projectId);
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const updateProjectRole = async (req, res, next) => {
    try {
        const project_id = req.params.id1;
        const user_id = req.params.id2;
        const { project_role } = req.body;

        const result = await projectMembersService.updateProjectRole({ project_id, user_id, project_role });

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
        });


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const deleteProjectMember = async (req, res, next) => {
    try {
        const project_id = req.params.id1;
        const user_id = req.params.id2;

        const result = await projectMembersService.deleteProjectMember({ project_id, user_id });
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: result.success,
                message: result.message,
            });
        }
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    assignProject,
    getProjectByUserId,
    getUsersByProjectId,
    updateProjectRole,
    deleteProjectMember
};
