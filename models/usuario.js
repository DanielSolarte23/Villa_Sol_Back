// models/usuario.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documentoIdentidad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombreDeUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.ENUM('admin', 'seguridad'),
      allowNull: false
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Informe, {
      foreignKey: 'remitenteId'
    });
  };

  return Usuario;
};