const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product,  Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
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
        'description',
        'featured',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.id = rating.product_id)'), 'int_rating_avg']
      ],
      include: [
        {
          model: Rating,
          attributes: ['id', 'user_id', 'product_id','rating','rating_commentary' ,'date'],
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




////////////////////////////////



router.get('/edit/:id', withAuth, (req, res) => {
  Rating.findByPk(req.params.id, {
    attributes: [
      'id',
      'user_id',
      'product_id',
      'rating',
      'rating_avg',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['id', 'name', 'api_id','featured','int_rating_avg']
      }
    ]
  })
    .then(dbRatingData => {
      if (dbRatingData) {
      
        const rating = dbRatingData.get({ plain: true });
        res.render('edit-rating', {
          rating,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
