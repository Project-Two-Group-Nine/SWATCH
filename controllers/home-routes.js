const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Comment, Rating, Wishlist } = require('../models');


const fetch = require("node-fetch");



/*
// for external data, append internal data
var product_append_int =  async function() {
  let result=[];
  let emptyIntProduct ={
    "int_id" : 0,
    "int_name" : 0,
    "int_api_id" : 0,
    "int_featured" : 0}
  let queryUrl = 'http://localhost:3001/api/productsexternal/'
     await fetch(queryUrl)
        .then(async function(response) {
          if (!response.ok) {
            return console.log('Error: productsexternal');
          }
          return await response.json();
        })
        .then(async function(data) {
          for (var i = 0; i < data.length; i++) {
            let queryUrl = 'http://localhost:3001/api/products/'+data[i].id
             await fetch(queryUrl)
                .then(async function(response){
                  if (!response.ok) {
                    return console.log('Error: products');
                  }
                  return response.json();
                })
                .then(async function(intProduct) {
                if (!intProduct ){
                  result.push(JSON.parse(JSON.stringify( { ...data[i], ...emptyIntProduct } )));
                }
                else {
                  result.push(JSON.parse(JSON.stringify( { ...data[i], ...intProduct }) ));
                  
                }
              })
            } 
        })
        .catch(function(error) {
          console.log("Unable to connect" + error);
       });  
  return result; 
};
*/


// GET products from DB
router.get('/', async function(req, res)  {
    console.log('======================');
    Product.findAll({
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
    }).then(dbProductData => {
        const products = dbProductData.map(post => post.get({ plain: true }));
        res.render('homepage', {
          products
        });
      });
  });
  

/*
// get all products-ext
router.get('/', async function(req, res)  {

    console.log('======================');
    let queryUrl = 'http://localhost:3001/api/productsexternal/'
     await fetch(queryUrl)
        .then(async function(response) {
          if (!response.ok) {
            return console.log('Error: productsexternal');
          }
          return await response.json();
        })
        .then(async function(products) {   
          res.render('homepage', {
            products,
            loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });*/
  
 

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
