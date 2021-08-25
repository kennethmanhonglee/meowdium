const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://jslfhogcrwxccz:546c3d795d5a078e4d16ac87a90815b3220d6a31bb66be91a857269294fd1987@ec2-52-45-179-101.compute-1.amazonaws.com:5432/da4giap3aj9nd7',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  }
};
