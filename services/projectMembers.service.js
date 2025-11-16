const { ProjectMembers } = require("../models");
const { Project } = require("../models")

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
                    attributes: ["id", "name"]
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

module.exports = {
    assignProject,
    getProjectByUserId
}