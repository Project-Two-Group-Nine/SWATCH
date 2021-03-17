const { Comment } = require('../models');

const commentdata = [
  {
    comment: 'Nunc rhoncus dui vel sem.',
    user_id: 1,
    product_id: 1,
    date: '03/12/2021'
  },
  {
    comment: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 6,
    product_id: 1,
    date: '03/14/2021'
  },
  {
    comment: 'Aliquam erat volutpat. In congue.',
    user_id: 6,
    product_id: 1,
    date: '03/13/2021'
  },
  {
    comment: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 3,
    product_id: 1,
    date: '03/11/2021'
  },
  {
    comment: 'In hac habitasse platea dictumst.',
    user_id: 7,
    product_id: 2,
    date: '03/15/2021'
  },
  {
    comment: 'Vivamus vestibulum sagittis sapien.',
    user_id: 4,
    product_id: 2,
    date: '03/14/2021'
  }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
