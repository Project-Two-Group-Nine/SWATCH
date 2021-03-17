const { Wishlist } = require('../models');

const wishlistdata = [
  {
    user_id: 6,
    product_id: 1,
    wish_list: 1,
    date: '03/11/2021'
  },
  {
    user_id: 6,
    product_id: 2,
    wish_list: 1,
    date: '03/11/2021'
  },
  {
    user_id: 1,
    product_id: 1,
    wish_list: 1,
    date: '03/11/2021'
  },
  {
    user_id: 1,
    product_id: 2,
    wish_list: 1,
    date: '03/10/2021'
  }
];

const seedWishlists = () => Wishlist.bulkCreate(wishlistdata);

module.exports = seedWishlists;
