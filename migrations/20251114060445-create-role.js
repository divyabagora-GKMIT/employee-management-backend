'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
       id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
          name: {
              type: Sequelize.STRING(50),
              allowNull: false,
              unique: true
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
    await queryInterface.dropTable('roles');
  }
};