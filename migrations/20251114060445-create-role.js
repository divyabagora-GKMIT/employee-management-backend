'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
       id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: DataTypes.STRING(50),
              allowNull: false,
              unique: true
          },
          created_at: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
          },
          updated_at: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
          },
          deleted_at: {
              type: DataTypes.DATE,
          },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};