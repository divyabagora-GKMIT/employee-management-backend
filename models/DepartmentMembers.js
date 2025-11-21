'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepartmentMembers extends Model {
    
    static associate(models) {
       DepartmentMembers.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user' 
      });

      DepartmentMembers.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department' 
      });
    }
  }
  DepartmentMembers.init({
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
    modelName: 'DepartmentMembers',
  });
  return DepartmentMembers;
};