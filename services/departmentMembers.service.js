const {DepartmentMembers} = require("../models");
const {Department} = require("../models");

const assignDepartment = async (payload) => {
    try {
        const { department_id, user_id } = payload;

        const department = await Department.findOne({
            where: { id: department_id },
            paranoid: true
        });

        if (!department) {
            return {
                statusCode: 404,
                success: false,
                message: "Department not found or has been deleted"
            };
        }

        const departmentMemberInDb = await DepartmentMembers.findOne({
            where: {
                user_id: user_id,
                department_id: department_id
            }
        })

        if (departmentMemberInDb) {
            return {
                statusCode: 422,
                success: false,
                message: "Already in the department"
            }
        }

        const newAssignment = await DepartmentMembers.create({
            department_id,
            user_id,
        })

        return {
            statusCode: 201,
            success: true,
            message: "Member added to department",
            data: newAssignment
        }
    } catch (error) {
        throw error
    }
}

const getDepartmentByUserID = async (userId) => {
    try {
        const departmentAssign = await DepartmentMembers.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Department,
                    as: "department",       
                    attributes: ["id", "name"]
                }
            ]
        });


        if (!departmentAssign.length) {
            return {
                statusCode: 404,
                success: false,
                message: "User is in no department"
            };
        }

        return {
            statusCode: 200,
            success: true,
            message: "Department fetched successfully",
            data: departmentAssign
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    assignDepartment,
    getDepartmentByUserID
}