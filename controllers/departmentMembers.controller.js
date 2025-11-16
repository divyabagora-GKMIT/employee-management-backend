const { departmentMembersService } = require("../services");

const assignDepartment = async (req, res, next) => {
    try {
        const { department_id, user_id } = req.body;
        if (!department_id || !user_id) {
            return res.status(400).json({
                success: false,
                message: "Enter required fields",
            });
        }

        const result = await departmentMembersService.assignDepartment(req.body);

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

const getDepartmentByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await departmentMembersService.getDepartmentByUserID(userId);

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


module.exports = {
    assignDepartment,
    getDepartmentByUserId
}