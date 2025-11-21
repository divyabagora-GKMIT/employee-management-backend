const { where } = require("sequelize");
const { ProjectMembers } = require("../models");
const { Project, User } = require("../models")

const assignProject = async (payload) => {
    try {
        const { project_id, user_id, project_role } = payload;

        const project = await Project.findOne({
            where: { id: project_id },
            paranoid: true
        });

        if (!project) {
            return {
                statusCode: 404,
                success: false,
                message: "Project not found or has been deleted"
            };
        }

        const projectMemberInDb = await ProjectMembers.findOne({
            where: {
                user_id: user_id,
                project_id: project_id
            }
        })

        if (projectMemberInDb) {
            return {
                statusCode: 422,
                success: false,
                message: "Already assigned with project"
            }
        }

        const newAssignment = await ProjectMembers.create({
            project_id,
            user_id,
            project_role
        })

        return {
            statusCode: 201,
            success: true,
            message: "Member assigned to project",
            data: newAssignment
        }
    } catch (error) {
        throw error
    }
}

const getProjectByUserId = async (userId) => {
    try {
        const projectAssignments = await ProjectMembers.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Project,
                    as: "project",
                    attributes: ["id", "name"],
                    paranoid: false
                }
            ]
        });


        if (!projectAssignments.length) {
            return {
                statusCode: 404,
                success: false,
                message: "No projects found for this user"
            };
        }

        return {
            statusCode: 200,
            success: true,
            message: "Projects fetched successfully",
            data: projectAssignments
        };
    } catch (error) {
        throw error;
    }
}

const getUsersByProjectId = async (projectId) => {
    try {
        const membersInProject = await ProjectMembers.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ["id", "name"],
                    paranoid: false
                }
            ]
        })

        if (!membersInProject.length) {
            return {
                statusCode: 404,
                success: false,
                message: "No members in this project"
            };
        }
        return {
            statusCode: 200,
            success: true,
            message: "Members fetched successfully",
            data: membersInProject
        };
    } catch (error) {
        throw error;
    }
}

const updateProjectRole = async (payload) => {
    try {
        const { user_id, project_id, project_role } = payload;

        const projectRoleInDb = await ProjectMembers.findOne({
            where: {
                user_id,
                project_id
            }
        })

        if (!projectRoleInDb) {
            return {
                statusCode: 422,
                success: false,
                message: "This user not found in this project"
            }
        }

        const updatedRole = await projectRoleInDb.update({
            project_role: project_role
        })

        return {
            statusCode: 200,
            success: true,
            message: "Project role updated successfully",
            data: updatedRole
        };

    } catch (error) {
        throw error;
    }
}

const deleteProjectMember = async (payload) => {
    try {
        const { project_id, user_id } = payload;

        const projectMemberInDb = await ProjectMembers.findOne({
            where: {
                user_id: user_id,
                project_id: project_id
            }
        })

        if (!projectMemberInDb) {
            return {
                statusCode: 422,
                success: false,
                message: "This user not found in this project"
            }
        }

        await projectMemberInDb.destroy();

        return {
            statusCode: 200,
            success: true,
            message: "Member successfully removed from the project",
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    assignProject,
    getProjectByUserId,
    getUsersByProjectId,
    updateProjectRole,
    deleteProjectMember
}