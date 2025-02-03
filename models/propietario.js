module.exports = (sequelize, DataTypes) => {
    const Propietario = sequelize.define('Propietario', {
      nombres: {
        type: DataTypes.STRING,
        allowNull: false
      },
      documentoIdentidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      estadoPago: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Propietario.associate = (models) => {
      Propietario.hasMany(models.Apartamento, {
        foreignKey: 'propietarioId'
      });
      Propietario.hasMany(models.Pago, {
        foreignKey: 'propietarioId'
      });
    };
  
    return Propietario;
  };