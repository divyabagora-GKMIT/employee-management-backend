'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
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
      },
      created_at: {
        type: 'TIMESTAMPTZ',
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: 'TIMESTAMPTZ',
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: 'TIMESTAMPTZ',
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};