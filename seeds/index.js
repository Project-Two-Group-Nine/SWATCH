const seedUsers = require('./user-seeds');
const seedProducts = require('./product-seeds');
const seedRatings = require('./rating-seeds');
const seedWishlists = require('./wishlist-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');

  await seedUsers();
  console.log('--------------');

  await seedProducts();
  console.log('--------------');

  /*await seedRatings();
  console.log('--------------');

  await seedWishlists();
  console.log('--------------');*/


  process.exit(0);
};

seedAll();
