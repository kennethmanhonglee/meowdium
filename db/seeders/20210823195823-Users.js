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
      // REAL PW: aAaA1!1!
      { userName: 'tim_jetthauser', email: 'tim_jetthauser@email.com', hashedPassword: '$2a$10$Saz6YBC2t2cZQM.8bEyr3uZiAzetIpnMjYT4ST0DAwSXwzOGryF/a', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'harmless_potato', email: 'potato@email.com', hashedPassword: '$2a$10$wUSUYOPrPlbfhKIypVoK6e6xUl1ZDgYukLsFHQCTbnRmK4zkQ8F8.', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'milkshake', email: 'boyz@my.yard', hashedPassword: '$2a$10$bx1kE4DTONAC4f4vOAEuW.vCbYePXTOlm4HNJpSSnhj0LN2Ovn5Nm', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'jenny_panini', email: 'jenny_panini@email.com', hashedPassword: '$2a$10$Saz6YBC2t2cZQM.8bEyr3uZiAzetIpnMjYT4ST0DAwSXwzOGryF/a', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'notCrazyCatLady', email: 'lady@email.com', hashedPassword: '$2a$10$Saz6YBC2t2cZQM.8bEyr3uZiAzetIpnMjYT4ST0DAwSXwzOGryF/a', createdAt: new Date(), updatedAt: new Date() },
      { userName: 'blob_marley', email: 'ipaintgood@email.com', hashedPassword: '$2a$10$Saz6YBC2t2cZQM.8bEyr3uZiAzetIpnMjYT4ST0DAwSXwzOGryF/a', createdAt: new Date(), updatedAt: new Date() },
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
