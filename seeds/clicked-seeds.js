const { Clicked } = require('../models');

const clickeddata = [
  {
    user_id: 6,
    product_id: 1,
    clicked:1,
    date: '03/15/2021'
  },
  {
    user_id: 5,
    product_id: 1,
    clicked:1,
    date: '03/14/2021'
  },
  {
    user_id: 3,
    product_id: 2,
    clicked:1,
    date: '03/12/2021'
  },
  {
    user_id: 2,
    product_id: 1,
    clicked:1,
    date: '03/14/2021'
  }
];

const seedClicked = () => Clicked.bulkCreate(clickeddata);

module.exports = seedClicked;
