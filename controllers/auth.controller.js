const {authService, userService} = require("../services")

const loginUser = async(req,res,next)=>{
    try {
        const {email , password} = req.body;
        if (!email || !password){
            return res.status(422).json({
                success :false,
                message: "Credentials are required"
            })
        }

        const result = await authService.loginUser(req.body);

        if (!result.success){
            return res.status(result.statusCode).json({
                success : result.success,
                message: result.message
            })
        }

        return res.status(result.statusCode).json({
            success : result.success,
            message: result.message,
            token: result.token
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const resetPassword = async(req,res,next)=>{
    try {
        const {email , newPassword} = req.body;

        if ( !email ||  !newPassword) {
            return res.status(400).json({
                success : false,
                message: "Credentials are required"
            })
        }

        const result = await authService.resetPassword(req.body);

        return res.status(result.statusCode).json({
            success : result.success,
            message : result.message
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    loginUser,
    resetPassword
}