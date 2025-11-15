'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        as: 'role'
      });

      User.belongsToMany(models.Project, {
        through: models.ProjectMembers,
        foreignKey: 'user_id',
        otherKey: 'project_id',
        as: 'projects' 
      });

      User.belongsToMany(models.Department, {
        through: models.UserDepartments,
        foreignKey: 'user_id',
        otherKey: 'department_id',
        as: 'departments' 
      });
    }
  }
  User.init({

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("registered", "active", "inactive", "suspended"),
      defaultValue: "registered"
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(100)
    },
    phone: {
      type: DataTypes.STRING(15)
    },
    address: {
      type: DataTypes.STRING(100)
    },
    date_of_birth: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.STRING(10)
    },
    joining_date: {
      type: DataTypes.DATE
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles", key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
