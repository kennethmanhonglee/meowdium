'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pawment = sequelize.define('Pawment', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    pawstId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {});
  Pawment.associate = function(models) {
    // associations can be defined here
    Pawment.belongsTo(models.User, { foreignKey: 'userId' })
    Pawment.belongsTo(models.Pawst, { foreignKey: 'pawstId' })
  };
  return Pawment;
};
