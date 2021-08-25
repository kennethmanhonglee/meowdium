'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      //TODO - Make real seeds for users
      // REAL PW: aAaA1!1!
      { userName: 'ken', email: 'ken@email.com', hashedPassword: '$2a$10$wUSUYOPrPlbfhKIypVoK6e6xUl1ZDgYukLsFHQCTbnRmK4zkQ8F8.', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'frank', email: 'frank@email.com', hashedPassword: '$2a$10$bx1kE4DTONAC4f4vOAEuW.vCbYePXTOlm4HNJpSSnhj0LN2Ovn5Nm', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'tim_jetthauser', email: 'tim_jetthauser@email.com', hashedPassword: '$2a$10$Saz6YBC2t2cZQM.8bEyr3uZiAzetIpnMjYT4ST0DAwSXwzOGryF/a', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

    // return queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
