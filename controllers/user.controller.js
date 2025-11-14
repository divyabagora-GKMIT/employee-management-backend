const { userService } = require("../services")

const createUser = async (req, res, next) => {
    const body = req.body;

    try {
        if (!body.name || !body.email || !body.password || !body.role_id) {
            console.log("Please provide the required data");
            return res.status(400).json({
                success: false,
                message: "Enter the required fields"
            })
        }
        const result = await userService.createUser(body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(201).json({
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
const viewUsers = async (req,res,next) => {
    try {
        const result = await userService.viewUsers();

        if (!result.success){
            return res.status(400).json({
                success : false,
                message: "Internal server error"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: result.data
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {
    createUser,
    viewUsers
}