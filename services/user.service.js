const { Role, User } = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const createUser = async (payload) => {
    try {
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
        const userInDb = await User.findOne({
            where: { email: email }
        })

        if (userInDb) {
            return {
                statusCode : 422,
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
            statusCode : 201,
            success: true,
            message: "User created successfully",
        };
    } catch (error) {
        throw error;
    }
}

const viewUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ["password", "deleted_at"]
            }
        });
        return {
            statusCode : 200,
            success: true,
            data: users
        }
    } catch (error) {
        throw error;
    }
}


const updateUser = async (userId, payload) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return {
                statusCode : 404,
                success: false,
                message: "User not found"
            }
        }

        const updatedUser = await User.update(payload, {
            where: { id: userId }
        });

        return {
            statusCode : 200,
            success: true,
            message: "User updated successfully",
        }
    } catch (error) {
        throw error;
    }
}


const deleteUser = async (userId, payload) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return {
                statusCode : 404,
                success: false,
                message: "User not found"
            }
        }

        await user.destroy();

        return {
            statusCode : 200,
            success: true,
            message: "User deleted successfully",
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    viewUsers,
    updateUser,
    deleteUser
}