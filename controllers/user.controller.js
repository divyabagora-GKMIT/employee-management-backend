const { userService, mailService } = require("../services")
const validator = require("validator");

const createUser = async (req, res, next) => {

    try {
        const body = req.body;
        if (!body.name || !body.email || !body.password || !body.role_id) {
            return res.status(400).json({
                success: false,
                message: "Enter the required fields"
            })
        }

        if (!validator.isEmail(body.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }
        const result = await userService.createUser(body);
        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }

        mailService.sendNewUserEmail({
            to: body.email,
            tempPassword: body.password,
            name: body.name
        });

        return res.status(result.statusCode).json({
            success: true,
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
const viewUsers = async (req, res, next) => {
    try {
        const result = await userService.viewUsers();

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: "Internal server error"
            })
        }

        return res.status(result.statusCode).json({
            success: true,
            message: "Data fetch successfully",
            data: result.data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async (req, res, next) => {

    try {
        const body = req.body;
        const userId = req.params.id;
        const result = await userService.updateUser(userId, body);

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            })
        }

        return res.status(result.statusCode).json({
            success: true,
            message: result.message,
            data: result.data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const result = await userService.deleteUser(userId);

        if (!result.success) {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }

        return res.status(result.statusCode).json({
            success: true,
            message: "User deleted successfully "
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = {
    createUser,
    viewUsers,
    updateUser,
    deleteUser
}