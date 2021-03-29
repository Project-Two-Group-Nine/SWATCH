const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


// get all products for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
      where: {
        id : [sequelize.literal(`(SELECT distinct(product_id) FROM rating WHERE rating.user_id = ${req.session.user_id} group by product_id)`)]
      },
      attributes: [
        'id',
        'name',
        'api_id',
        'image_link',
        'brand',
        'price',
        'rating',
        'category',
        'product_type',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg'],
        [sequelize.literal(`(Select case when ${req.session.user_id} in (select rating.user_id from rating where product.id = rating.product_id) then 1 else 0 end  )`), 'rated'],
        [sequelize.literal(`(Select case when ${req.session.user_id} in (select wishlist.user_id from wishlist where product.id = wishlist.product_id) then 1 else 0 end  )`), 'wished']
      ],
      include: [
        {
          model: Rating,
          where: {
            id : [sequelize.literal(`(SELECT distinct(id) FROM rating WHERE rating.user_id = ${req.session.user_id} group by id)`)]
          },
          attributes: ['id', 'user_id', 'product_id','rating','rating_commentary' ,'date'],
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        }
      ]
    })
    .then(dbProductData => {
      const products = dbProductData.map(product => product.get({ plain: true }));

      res.render('dashboard', {
        products,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
