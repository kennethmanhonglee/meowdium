'use strict';
module.exports = (sequelize, DataTypes) => {
  const Catnip = sequelize.define('Catnip', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    pawstId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Catnip.associate = function(models) {
    Catnip.belongsTo(models.User, { foreignKey: 'userId' });
    Catnip.belongsTo(models.Pawst, { foreignKey: 'pawstId' });
  };
  return Catnip;
};