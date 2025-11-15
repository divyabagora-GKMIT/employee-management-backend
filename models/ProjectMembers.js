'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMembers extends Model {
    static associate(models) {
      ProjectMembers.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user' 
      });

      ProjectMembers.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project' 
      });
    }
  }
  ProjectMembers.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_role: {
      type: DataTypes.STRING(100)
    },
    start_at: {
      type: DataTypes.DATE
    },
    end_at: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'ProjectMembers',
  });
  return ProjectMembers;
};