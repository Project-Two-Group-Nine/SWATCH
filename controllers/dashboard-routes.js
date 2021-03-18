const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');
const withAuth = require('../utils/auth');
const fetch = require("node-fetch");
var Sequelize = require('sequelize');
const Op = Sequelize.Op;



// for interna data, append external data
var product_append_ext =  async function(dbProductData) {
  let result=[];
    // format the api url
    var apiUrl ="http://makeup-api.herokuapp.com/api/v1/products.json";
    var data = null;
        // make a request to the url
        await fetch(apiUrl)
        .then(async function(response) {
          // request was successful
          if (response.ok) {
            await response.json().then(async function(dbProductData) {
              data =  await dbProductData;
            });
          } else {
          console.log("Error: " + response.statusText);
          }
        })
        .catch(function(error) {
          console.log("Unable to connect" + error);
        });
   
     for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < dbProductData.length; j++) {
                if (data[i].id == dbProductData[j].dataValues.int_api_id){
                  result.push(JSON.parse(JSON.stringify( { ...data[i], ...dbProductData[j].dataValues }) ));
                 }
            }
      } 

  console.log(result);
  return result; 
};




//////////////////////////////////////////////////////////////
// get all products for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Product.findAll({
      where: {
        int_id : {[Op.in]: [sequelize.literal(`(SELECT product_id FROM comment WHERE comment.user_id = ${req.session.user_id}  union SELECT product_id FROM rating WHERE rating.user_id = ${req.session.user_id})`), 'int_id']}
      },
      attributes: [
        'int_id',
        'int_name',
        'int_api_id',
        'int_featured',
        [sequelize.literal('(SELECT AVG(Rating) FROM rating WHERE product.int_id = rating.product_id)'), 'int_rating_avg']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'user_id' ,'product_id', 'comment', 'date'],
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        },
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
    .then( async function(dbProductData) {   
      var products = await product_append_ext(dbProductData)
      res.render('dashboard', { products, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




////////////////////////////////






router.get('/edit/:id', withAuth, (req, res) => {
  Comment.findByPk(req.params.id, {
    attributes: [
      'id',
      'user_id',
      'product_id',
      'comment',
      'date'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email']
      },
      {
        model: Product,
        attributes: ['int_id', 'int_name', 'int_api_id','int_featured','int_rating_avg']
      }
    ]
  })
    .then(dbCommentData => {
      if (dbCommentData) {
      
        const comment = dbCommentData.get({ plain: true });
        res.render('edit-comment', {
          comment,
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
