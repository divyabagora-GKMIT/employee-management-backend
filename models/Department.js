'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
     Department.belongsToMany(models.User, {
        through: models.UserDepartments,
        foreignKey: 'department_id',
        otherKey: 'user_id',
        as: 'users'
      }
      )
    }
  }
  Department.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    }
    
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};