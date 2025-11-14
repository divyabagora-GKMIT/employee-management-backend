const { Role, User } = require("../models");
const bcrypt = require("bcrypt");
const createUser = async (payload) => {
    const { name,
        email,
        password,
        designation,
        phone,
        address,
        date_of_birth,
        gender,
        joining_date,
        role_id
    } = payload;

    try {

        const userInDb = await User.findOne({
            where: { email: email }
        })

        if (userInDb) {
            return {
                success: false,
                message: "User already exits"
            }
        }

       
        let hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            designation,
            phone,
            address,
            date_of_birth,
            gender,
            joining_date,
            role_id
        })

        return {
            success: true,
            message: "User created successfully",
            // data: newUser
        };
    } catch (error) {
        throw error;
    }
}

const viewUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "created_at", "updated_at", "deleted_at"]
            }
        });
        console.log(users);

        return {
            success: true,
            data: users
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    viewUsers
}