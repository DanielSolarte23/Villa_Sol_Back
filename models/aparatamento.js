module.exports = (sequelize, DataTypes) => {
    const Apartamento = sequelize.define('Apartamento', {
      numeroApartamento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      metros: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM('ocupado', 'desocupado'),
        allowNull: false,
        defaultValue: 'desocupado'
      }
    });
  
    Apartamento.associate = (models) => {
      Apartamento.hasMany(models.Visitante, {
        foreignKey: 'apartamentoId'
      });
      Apartamento.belongsTo(models.Propietario, {
        foreignKey: 'propietarioId'
      });
    };
  
    return Apartamento;
  };