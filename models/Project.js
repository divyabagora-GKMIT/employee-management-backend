'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {

    static associate(models) {
      Project.belongsToMany(models.User, {
        through: models.ProjectMembers,
        foreignKey: "project_id",
        otherKey: "user_id",
        as: "users"
      });
    }
  }
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Hold"),
      defaultValue: "Active",
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
