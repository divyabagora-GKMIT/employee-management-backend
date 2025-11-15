'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDepartments extends Model {
    
    static associate(models) {
       UserDepartments.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user' 
      });

      UserDepartments.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department' 
      });
    }
  }
  UserDepartments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'UserDepartments',
  });
  return UserDepartments;
};