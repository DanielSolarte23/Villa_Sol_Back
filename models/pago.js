module.exports = (sequelize, DataTypes) => {
    const Pago = sequelize.define('Pago', {
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    Pago.associate = (models) => {
      Pago.belongsTo(models.Propietario, {
        foreignKey: 'propietarioId'
      });
    };
  
    return Pago;
  };