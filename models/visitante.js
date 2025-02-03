module.exports = (sequelize, DataTypes) => {
    const Visitante = sequelize.define('Visitante', {
      nombres: {
        type: DataTypes.STRING,
        allowNull: false
      },
      documento: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Visitante.associate = (models) => {
      Visitante.belongsTo(models.Apartamento, {
        foreignKey: 'apartamentoId'
      });
    };
  
    return Visitante;
  };