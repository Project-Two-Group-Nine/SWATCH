const { Rating } = require('../models');

const ratingdata = [
  {
    user_id: 9,
    product_id: 1,
    rating: 3,
    rating_commentary: 'I think this is good 3.',
    date: '03/14/2021'
  },
  {
    user_id: 8,
    product_id: 2,
    rating: 4,
    rating_commentary: 'I think this is good 4.',
    date: '03/15/2021'
  },
  {
    user_id: 7,
    product_id: 1,
    rating: 1,
    rating_commentary: 'I think this is not good 1.',
    date: '03/12/2021'
  },
  {
    user_id: 7,
    product_id: 2,
    rating: 0,
    rating_commentary: 'I think this is not good 0.',
    date: '03/15/2021'
  },
];

const seedRatings = () => Rating.bulkCreate(ratingdata);

module.exports = seedRatings;
