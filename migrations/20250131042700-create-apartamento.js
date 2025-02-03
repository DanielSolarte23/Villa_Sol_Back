'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apartamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroApartamento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      metros: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('ocupado', 'desocupado'),
        allowNull: false,
        defaultValue: 'desocupado'
      },
      propietarioId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Propietarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apartamentos');
  }
};