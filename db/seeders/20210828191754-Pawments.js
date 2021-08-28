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
    return queryInterface.bulkInsert('Pawments', [
      { userId: 6, pawstId: 14, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 12, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 1, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 11, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 9, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 7, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 20, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 2, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 18, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 4, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 1, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 9, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 14, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 11, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 11, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 8, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 5, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 2, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 4, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 21, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 9, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 7, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 19, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 3, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 7, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 12, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 16, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 5, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 9, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 6, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 17, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 5, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 12, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 6, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 2, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 9, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 17, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 3, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 10, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 12, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 13, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 18, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 8, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 6, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 21, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 8, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 3, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 11, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 6, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 8, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 7, content: 'Good post, thank you for posting!', createdAt: new Date(), updatedAt: new Date() },

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Pawments', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
