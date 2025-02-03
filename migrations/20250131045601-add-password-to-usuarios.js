// migrations/XXXXXXXXXXXXXX-add-password-to-usuarios.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '123456' // valor temporal para registros existentes
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'password');
  }
};