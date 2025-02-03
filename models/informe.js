module.exports = (sequelize, DataTypes) => {
    const Informe = sequelize.define('Informe', {
      motivo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    Informe.associate = (models) => {
      Informe.belongsTo(models.Usuario, {
        foreignKey: 'remitenteId'
      });
    };
  
    return Informe;
  };