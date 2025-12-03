const { Department } = require("../models");

const createDepartment = async(payload)=> {
    try {
        const { name } = payload;
        const departmentInDb = await Department.findOne({
            where: {name : name}
        })  

        if (departmentInDb){
            return {
                statusCode : 422,
                success : false,
                message: "Department already exists"
            }
        }

        const newDepartment = await Department.create({
            name : name
        })

        console.log(newDepartment);
        return {
            statusCode : 201,
            success :true,
            message: "Department created successfully",
            data: newDepartment
        }
    } catch (error) {
        throw error
    }   
}


const viewDepartments = async() => {
    try {
        const allDept = await Department.findAll({
            attributes : {
                exclude: ["deleted_at"]
            }
        })

        return {
            statusCode : 200,
            success : true,
            message: "Data fetch successfully",
            data: allDept
        }
    } catch (error) {
        throw error
    }
}

const deleteDepartment = async(deptId) => {
    try {
        const dept = await Department.findByPk(deptId);

        if (!dept){
            return {
                statusCode : 404,
                success: false,
                message: "Department not found"
            }
        }
        await dept.destroy();

        return {
            statusCode : 200,
            success : true,
            message: "Department deleted successfully"
        }
    } catch (error) {
        throw error;
    }
}

const updateDepartment = async(deptId,payload)=>{
    try {
        
        const dept = await Department.findByPk(deptId);
           if (!dept){
            return {
                statusCode : 404,
                success: false,
                message: "Department not found"
            }
        }

        const updatedUser = await Department.update(payload,{
            where: {id : deptId}
        });


        return {
            statusCode : 200,
            success: true,
            message: "Department updated successfully",
        }
    } catch (error) {
        throw error
    }
}
module.exports= {
    createDepartment,
    viewDepartments,
    deleteDepartment,
    updateDepartment
}