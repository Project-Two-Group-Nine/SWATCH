const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


//////////////////////////////////////////////////////////////

// get all products for wishlist
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
    where: {
      id : [sequelize.literal(`(SELECT distinct(product_id) FROM wishlist WHERE wishlist.user_id = ${req.session.user_id} group by product_id)`)]
    },
    attributes: [
      'id',
      'name',
      'api_id',
      'image_link',
      'description',
      'brand',
      'price',
      'rating',
      'category',
      'product_type',
      'featured',
      [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg'],
      [sequelize.literal(`(Select case when ${req.session.user_id} in (select rating.user_id from rating where product.id = rating.product_id) then 1 else 0 end  )`), 'rated'],
      [sequelize.literal(`(Select case when ${req.session.user_id} in (select wishlist.user_id from wishlist where product.id = wishlist.product_id) then 1 else 0 end  )`), 'wished']
    ],
    include: [
      {
        model: Wishlist,
        where: {
          id : [sequelize.literal(`(SELECT distinct(id) FROM wishlist WHERE wishlist.user_id = ${req.session.user_id} group by id)`)]
        },
        attributes: ['id', 'user_id', 'product_id','wish_list', 'date'],
        include: {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      }
    ]
    })
    .then( dbWishlistData => {   
      const products = dbWishlistData.map(item => item.get({ plain: true }));
      res.render('wishlist', { products, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
