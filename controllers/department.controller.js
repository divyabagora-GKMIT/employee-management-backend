const { departmentService } = require("../services");

const createDepartment = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(422).json({
                success: false,
                message: "Provide required fields"
            })
        }
        const result = await departmentService.createDepartment(req.body);
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

const viewDepartments = async (req, res, next) => {
    try {
        const result = await departmentService.viewDepartments();
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

const deleteDepartment = async (req, res, next) => {
    try {
        const deptId = req.params.id;
        const result = await departmentService.deleteDepartment(deptId);
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

const updateDepartment = async(req,res,next) => {
    try {
        const {name} = req.body;
        const deptId = req.params.id
        if (!name){
            res.status(422).json({
                success : false,
                message: "Nothing to Update"
            })
        }

        const result = await departmentService.updateDepartment(deptId,req.body);
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
    createDepartment,
    viewDepartments,
    deleteDepartment,
    updateDepartment
}