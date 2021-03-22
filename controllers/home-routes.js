const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

const fetch = require("node-fetch");



// get all products for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
      attributes: [
        'id',
        'name',
        'api_id',
        'image_link',
        'description',
        'featured',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg']
      ],
      include: [
    
        {
          model: Rating,
          attributes: ['id', 'user_id', 'product_id', 'rating', 'date'],
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        },
        {
          model: Wishlist,
          attributes: ['id', 'user_id', 'product_id','wish_list', 'date'],
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        }
      ],
      limit: 10
    })
    .then(dbProductData => {
      const products = dbProductData.map(product => product.get({ plain: true }));
      res.render('homepage', {
        products,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


  ////////login//////


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
