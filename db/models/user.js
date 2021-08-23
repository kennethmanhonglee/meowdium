'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Pawst, { foreignKey: 'userId' });
  };
  return User;
};