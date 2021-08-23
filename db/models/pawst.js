'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pawst = sequelize.define('Pawst', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Pawst.associate = function(models) {
    // associations can be defined here
    Pawst.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Pawst;
};