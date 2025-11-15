const {authService} = require("../services")

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

        return res.status(res.statusCode).json({
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

module.exports = {
    loginUser
}