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
      { userId: 1, pawstId: 13, content: 'That is so helpful! Wish I knew that before', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 3, content: 'He really wasn\'t too much bigger than a cat, not when compared to an adult.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 9, content: 'Once, when berrying, I met with a cat with young kittens in the woods, quite wild, and they all, like their mother, had their backs up and were fiercely spitting at me.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 12, content: 'Look what he dreamt; a woman ironing shirts, a child playing, a cat and a farmer pitching hay.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 6, content: 'The cat can have some milk, and the mouse can have some cake.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 3, content: 'Thankful for the change of subject, Cynthia launched into a description of her latest conquests with the cat, again tucking that nagging doubt to the back of her mind.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 9, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 2, content: '"Dusty is just now on good terms with my cat," Biana replied.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 20, content: 'The cat can have some milk, and the mouse can have some cake.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 8, content: 'Bianca was asleep on the couch, the cat curled on her back.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 11, content: 'She felt like petting the healer to calm him as she might Toby.s cat but suspected it wouldn.t be welcome.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 13, content: 'Like a cat, she had attached herself not to the people but to the home.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 15, content: 'I\'m in no mood to watch a cat fight tonight.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 18, content: 'Once I was surprised to see a cat walking along the stony shore of the pond, for they rarely wander so far from home.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 8, content: 'Bianca was asleep on the couch, the cat curled on her back.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 13, content: 'Dusty said I have to leave the cat with you.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 9, content: '"You look like the cat that swallowed the canary," he said, giving her a puzzled look.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 14, content: 'She felt like petting the healer to calm him as she might Toby.s cat but suspected it wouldn.t be welcome.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 13, content: 'Look what he dreamt; a woman ironing shirts, a child playing, a cat and a farmer pitching hay.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 3, content: 'I am alone in this house, with only a cat for company though he gives me little solace.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 3, content: 'An old Cat was in a fair way to kill all the Mice in the barn.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 19, content: 'Dawkins asked as he waved a foot at the cat, who scurried back and repeated her greeting.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 17, content: 'The cat would like to eat the mouse.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 13, content: '"You look like the cat that swallowed the canary," he said, giving her a puzzled look.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 16, content: '"Yes. Sweet cat," Jenn replied.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 8, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 14, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 14, content: 'She giggled and cuddled the cat close.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 15, content: 'Like a cat, she had attached herself not to the people but to the home.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 8, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 4, content: 'She felt like petting the healer to calm him as she might Toby.s cat but suspected it wouldn.t be welcome.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 16, content: 'And don\'t try to tell me that black cat wasn\'t you!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 7, content: 'undefined', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 17, content: 'An old Cat was in a fair way to kill all the Mice in the barn.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 13, content: 'undefined', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 7, content: 'The svelte model wore towering boots and a one - piece cat suit that left nothing to the imagination.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 9, content: 'undefined', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 6, content: 'She hugged the cat and then hugged Alex.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 3, content: 'Cade handed her the cat and cuffed her playfully.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 2, content: 'The cat would like to eat the mouse.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 9, content: 'It didn\'t purr like a cat but growled.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 3, content: 'Bianca was asleep on the couch, the cat curled on her back.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 9, content: 'She kneeled down to pet the cat.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 9, content: 'Once, when berrying, I met with a cat with young kittens in the woods, quite wild, and they all, like their mother, had their backs up and were fiercely spitting at me.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 15, content: 'An old Cat was in a fair way to kill all the Mice in the barn.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 13, content: 'Bianca was asleep on the couch, the cat curled on her back.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 17, content: 'It didn\'t purr like a cat but growled.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 12, content: 'Dean went to cat and girl and gave them both a long hug.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 15, content: 'Dusty said I have to leave the cat with you.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 6, pawstId: 21, content: 'Dusty said I have to leave the cat with you.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 17, content: 'She felt like petting the healer to calm him as she might Toby.s cat but suspected it wouldn.t be welcome.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 16, content: 'She lifted the cat to her lap and turned so the light from the doorway would fall on the foot.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 15, content: 'Cade handed her the cat and cuffed her playfully.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 3, content: 'And don\'t try to tell me that black cat wasn\'t you!', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 11, content: 'He really wasn\'t too much bigger than a cat, not when compared to an adult.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 16, content: 'It didn\'t purr like a cat but growled.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 1, content: '"First time I ever saw a pink cat," said Zeb.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, pawstId: 14, content: 'Dean went to cat and girl and gave them both a long hug.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, pawstId: 11, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 5, pawstId: 14, content: 'A large grey cat was asleep on a rocking chair.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 16, content: 'She kneeled down to pet the cat.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, pawstId: 6, content: 'Once, when berrying, I met with a cat with young kittens in the woods, quite wild, and they all, like their mother, had their backs up and were fiercely spitting at me.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 13, content: '"First time I ever saw a pink cat," said Zeb.', createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, pawstId: 19, content: 'Thankful for the change of subject, Cynthia launched into a description of her latest conquests with the cat, again tucking that nagging doubt to the back of her mind.', createdAt: new Date(), updatedAt: new Date() },
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
