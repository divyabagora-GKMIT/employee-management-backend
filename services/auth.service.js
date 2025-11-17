const {User}  = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { password } = require("../config/config");
const loginUser = async(payload)=>{
    try {
        const {email , password} = payload;
        const userInDb = await User.findOne({
            where : {email : email},
            attributes: ['id', 'email', 'password','role_id','status']
        });
        if (!userInDb){
            return {
                statusCode: 401,
                success :false,
                message : "Invalid Email"
            }
        }
        
        const isPasswordMatched = await bcrypt.compare(password,userInDb.password);

        if (!isPasswordMatched){
            return {
                statusCode: 401,
                success : false,
                message : "Invalid Password"
            }
        }
    
        const token = jwt.sign({
            id: userInDb.id,
            email: userInDb.email,
            role: userInDb.role_id,
            status: userInDb.status
        },process.env.JWT_SECRET,{
            expiresIn:"2d"
        })

        return {
            statusCode: 200,
            success :true,
            message : "Login Successfully",
            token : token
        }

    } catch (error) {
        throw error;
    }
}

const resetPassword = async(payload) => {
    try {
        const {email , newPassword} = payload;
        const userInDb = await User.findOne({
            where : {email : email},
        });

        if (!userInDb){
            return {
                statusCode : 404,
                success : false,
                message : "User not found"
            }
        }

        const hashedNewPassword = await bcrypt.hash(newPassword,12);

        await userInDb.update({
            password : hashedNewPassword,
            status: "active"
        });

        return {
            statusCode: 200,
            success: true,
            message: "Password updated successfully"
        };
    } catch (error) {
        throw error;
    }
}

module.exports ={
    loginUser,
    resetPassword
}